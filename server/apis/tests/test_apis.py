import pytest

from django.urls import reverse

from .factories import CategoryFactory

pytestmark = pytest.mark.django_db

class TestCategoryEndpoints:
    url = reverse('apis:category-list')

    def test_list(self, api_client, db):
        CategoryFactory.create_batch(5)
        response = api_client.get(self.url)
        assert response.status_code == 200
        assert len(response.json()) == 5