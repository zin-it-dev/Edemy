import pytest
from django.contrib.auth import get_user_model

User = get_user_model()

pytestmark = pytest.mark.django_db


@pytest.fixture
def mock_user():
    return User.objects.create_user(
        clerk_id="user_clerk_12345",
        email="zin.it.dev@gmail.com",
        username="zin_dev_test",
        first_name="Vinh",
        last_name="Lê",
    )


def test_clerk_auth(api_client, mock_user):
    api_client.force_authenticate(user=mock_user)

    response = api_client.get("/users/current-user/")

    assert response.status_code == 200
    assert response.data["email"] == "zin.it.dev@gmail.com"
