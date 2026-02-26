import factory
from faker import Factory as FakerFactory

faker = FakerFactory.create()


class GenericFactory(factory.django.DjangoModelFactory):
    name = factory.LazyAttribute(lambda x: faker.name())

    class Meta:
        abstract = True
