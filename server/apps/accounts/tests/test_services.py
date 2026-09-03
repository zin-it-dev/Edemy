import pytest
from accounts.models import User
from accounts.services import ClerkWebhookService


@pytest.mark.django_db
def test_handle_user_created_or_updated_accepts_clerk_json_payload():
    data = {
        "id": "user_clerk_json",
        "email_addresses": [{"id": "idn_email", "email_address": "json@example.com"}],
        "primary_email_address_id": "idn_email",
        "username": "json-user",
        "first_name": "Json",
        "last_name": "User",
    }

    user = ClerkWebhookService.handle_user_created_or_updated(data)

    assert user.email == "json@example.com"
    assert user.username == "json-user"
    assert User.objects.filter(clerk_id="user_clerk_json").exists()


@pytest.mark.django_db
def test_handle_user_deleted_removes_user():
    User.objects.create_user(
        clerk_id="user_clerk_deleted",
        email="deleted@example.com",
        username="deleted-user",
    )

    ClerkWebhookService.handle_user_deleted("user_clerk_deleted")

    assert not User.objects.filter(clerk_id="user_clerk_deleted").exists()
