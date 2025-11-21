import pytest

from django.test import Client
from rest_framework.test import APIClient
from pytest_factoryboy import register

from .factories import CategoryFactory
from apis.models import User

register(CategoryFactory)


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture(scope="session")
def admin_user(django_db_setup, django_db_blocker):
    with django_db_blocker.unblock():
        user = User.objects.create_superuser(
            email="admin@gmail.com", username="admin", password="admin"
        )
        return user


@pytest.fixture
def admin_client(client, admin_user):
    client.login(username="admin@gmail.com", password="admin")
    return client
