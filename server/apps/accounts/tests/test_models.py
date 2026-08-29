import pytest
from django.contrib.auth import get_user_model
from django.db import IntegrityError

User = get_user_model()


@pytest.mark.django_db
class TestUserModel:
    def test_user_defaults_to_active_student(self):
        user = User.objects.create_user(
            email="Learner@Example.com",
            username="learner",
            password="testpass123",
        )

        assert user.email == "learner@example.com"
        assert user.role == User.Roles.USER
        assert user.is_student is True
        assert user.profile.user == user

    def test_role_permissions_respect_active_state(self):
        educator = User.objects.create_user(
            email="educator@example.com",
            username="educator",
            password="testpass123",
            role=User.Roles.EDUCATOR,
        )
        admin = User.objects.create_user(
            email="admin@example.com",
            username="admin",
            password="testpass123",
            role=User.Roles.ADMIN,
            is_staff=True,
        )

        assert educator.is_educator is True
        assert admin.is_app_admin is True

        educator.is_active = False
        admin.is_active = False
        assert educator.is_educator is False
        assert admin.is_app_admin is False

    def test_clerk_id_is_optional_but_unique(self):
        User.objects.create_user(
            email="first@example.com",
            username="first",
            password="testpass123",
            clerk_id="clerk_123",
        )

        with pytest.raises(IntegrityError):
            User.objects.create_user(
                email="second@example.com",
                username="second",
                password="testpass123",
                clerk_id="clerk_123",
            )
