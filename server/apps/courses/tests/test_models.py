import pytest
from courses.tests.factories import CategoryFactory


class TestCategoryModel:
    """Test Category model."""

    @pytest.mark.django_db
    def test_category_creation(self):
        """Test creating a category."""
        category = CategoryFactory(name="X")
        assert category.id is not None
        assert category.name == "X"

    @pytest.mark.django_db
    def test_multiple_categories(self):
        """Test creating multiple categories."""
        categories = CategoryFactory.create_batch(10)
        assert len(categories) == 10
