import pytest

from apis.models import Category
from .factories import CategoryFactory


@pytest.mark.django_db
def test_factory():
    """Factories become fixtures automatically."""
    category = CategoryFactory()
    assert category is not CategoryFactory
    assert isinstance(category, Category)  