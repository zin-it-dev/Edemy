import pytest

from apis.models import Category
from .factories import CategoryFactory


@pytest.mark.django_db
def test_model_factory():
    """
        Factories become fixtures automatically.
        Instances become fixtures automatically.
    """
    category = CategoryFactory()
    assert category is not Category
    assert isinstance(category, Category)