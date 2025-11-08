import pytest

from apis.models import Category, Course
from .factories import CategoryFactory, CourseFactory


@pytest.mark.django_db
def test_model_factory():
    """
        Factories become fixtures automatically.
        Instances become fixtures automatically.
    """
    category = CategoryFactory()
    assert category is not Category
    assert isinstance(category, Category)
    
    course = CourseFactory()
    assert course is not Course
    assert isinstance(course, Course)