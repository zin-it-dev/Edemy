import pytest
from rest_framework.test import APIClient
from accounts.models import User


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def base_user(db):
    return User.objects.create_user(
        email="user@edemy.com", username="tester", password="edemy123"
    )


@pytest.fixture
def admin_user(db):
    return User.objects.create_superuser(
        username="admin_test", email="admin@gmail.com", password="password123"
    )


@pytest.fixture
def auth_client(api_client, base_user):
    api_client.force_authenticate(user=base_user)
    return api_client


@pytest.fixture
def auth_admin_client(api_client, admin_user):
    api_client.force_authenticate(user=admin_user)
    return api_client
