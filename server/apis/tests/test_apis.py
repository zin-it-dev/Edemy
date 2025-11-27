import pytest, json

from django.urls import reverse

from .factories import CategoryFactory, CourseFactory

pytestmark = pytest.mark.django_db


class TestCategoryEndpoints:
    url = reverse("apis:category-list")

    def test_list(self, api_client):
        CategoryFactory.create_batch(5)
        response = api_client.get(self.url, format="json")
        assert response.status_code == 200
        assert len(response.json()) == 5


class TestCourseEndpoints:
    url = reverse("apis:course-list")

    def test_list(self, api_client):
        CourseFactory.create_batch(10)
        response = api_client.get(self.url, format="json")
        assert response.status_code == 200
        assert response.json().get("count") == 10

    def test_retrieve(self, api_client):
        course = CourseFactory.create()
        response = api_client.get(f"{self.url}{course.slug}/")
        assert response.status_code == 200
        assert response.json()["name"] == course.name

    def test_search(self, api_client):
        from django_elasticsearch_dsl.registries import registry

        fixtures = [
            {
                "name": "Django for Beginners",
                "description": "Learn Django from scratch.",
            },
            {"name": "Advanced Django", "description": "Deep dive into Django."},
            {"name": "Flask Basics", "description": "Introduction to Flask."},
        ]

        for item in fixtures:
            course = CourseFactory.create(
                name=item["name"], description=item["description"]
            )
            registry.update(course)
        
        response = api_client.get(f"{self.url}?search=Django", format="json")
        assert response.status_code == 200
        assert response.json().get("count") == 2
        assert all(
            "Django" in course["name"] for course in response.json().get("results", [])
        )

    def test_filters(self, api_client):
        CourseFactory.create_batch(
            1, price=300.00, category=CategoryFactory.create(name="Math")
        )
        response = api_client.get(f"{self.url}?category=Math", format="json")
        assert response.status_code == 200

        min_price_response = api_client.get(f"{self.url}?min_price=200", format="json")
        assert min_price_response.json().get("count") == 1
        
        max_price_response = api_client.get(
            f"{self.url}?max_price=200", format="json"
        )
        assert max_price_response.json().get("count") == 0