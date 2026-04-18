import pytest
from django.urls import reverse

pytestmark = pytest.mark.django_db


class TestAdminSite:
    def test_index_view(self, admin_client):
        url = reverse("admin:index")
        response = admin_client.get(url)
        assert response.status_code == 200
