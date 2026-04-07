import pytest
from django.urls import reverse
from django.utils.translation import override, activate

pytestmark = pytest.mark.django_db


class TestAdminSite:
    def test_index_view(self, admin_client):
        activate('en')
        url = reverse("admin:index")
        response = admin_client.get(url)
        assert response.status_code == 200