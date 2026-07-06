import pytest
from django.urls import reverse
from shop.models import Course
from shop.factories import CategoryFactory, CourseFactory

pytestmark = pytest.mark.django_db


class TestCategories:
    url = reverse("category-list")

    def test_list(self, api_client):
        CategoryFactory.create_batch(5)
        response = api_client.get(self.url, format="json")
        assert response.status_code == 200
        assert len(response.json()) == 5


class TestCourses:
    url = reverse("course-list")

    def test_list(self, api_client):
        CourseFactory.create_batch(5)
        response = api_client.get(self.url, format="json")
        assert response.status_code == 200
        assert len(response.json()) == 5