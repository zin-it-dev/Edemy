import pytest
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.fixture(autouse=True)
def timezone_settings(settings):
    """Ensure consistent timezone."""
    settings.TIME_ZONE = "UTC"


@pytest.fixture
def user(db):
    """Create a test user."""
    return User.objects.create_user(
        email="test@example.com", password="testpass123", username="testuser"
    )


@pytest.fixture
def admin_user(db):
    """Create an admin user."""
    return User.objects.create_superuser(
        email="admin@example.com", password="adminpass123", username="admin"
    )


@pytest.fixture
def authenticated_client(client, user):
    """Return authenticated client."""
    client.force_login(user)
    return client


@pytest.fixture
def api_client():
    """Return DRF API client."""
    from rest_framework.test import APIClient

    return APIClient()


@pytest.fixture
def authenticated_api_client(api_client, user):
    """Return authenticated API client."""
    api_client.force_authenticate(user=user)
    return api_client


@pytest.fixture
def db_access_without_rollback_and_truncate(request, django_db_setup, django_db_blocker):
    django_db_blocker.unblock()
    yield
    django_db_blocker.restore()