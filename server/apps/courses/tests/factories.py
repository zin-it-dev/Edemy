import factory
from courses.models import Category


class CategoryFactory(factory.django.DjangoModelFactory):
    """Factory for Category model."""

    class Meta:
        model = Category

    name = factory.Faker("word")
    # slug = factory.LazyAttribute(lambda obj: obj.name.lower())
