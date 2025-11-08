import pytest, json

from django.urls import reverse

from .factories import CategoryFactory, CourseFactory

pytestmark = pytest.mark.django_db

class TestCategoryEndpoints:
    url = reverse('apis:category-list')

    def test_list(self, api_client):
        CategoryFactory.create_batch(5)
        response = api_client.get(self.url, format='json')
        assert response.status_code == 200
        assert len(response.json()) == 5
        
        
class TestCourseEndpoints:
    url = reverse('apis:course-list')

    def test_list(self, api_client):
        CourseFactory.create_batch(10)
        response = api_client.get(self.url, format='json')
        assert response.status_code == 200
        assert len(response.json()) == 10
        
    def test_retrieve(self, api_client):
        course = CourseFactory.create()
        response = api_client.get(f"{self.url}{course.slug}/")
        assert response.status_code == 200
        assert response.json()['name'] == course.name