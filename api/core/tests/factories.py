import factory
from faker import Factory as FakerFactory

from core.models import User

faker = FakerFactory.create()


class GenericFactory(factory.django.DjangoModelFactory):
    name = factory.LazyAttribute(lambda x: faker.name())

    class Meta:
        abstract = True


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Sequence(lambda n: f"user_{n}")
    email = factory.Sequence(lambda n: f"user_{n}@example.com")
    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
