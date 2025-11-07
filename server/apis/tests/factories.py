import factory

from faker import Factory as FakerFactory

from apis.models import Category

faker = FakerFactory.create()

class CategoryFactory(factory.django.DjangoModelFactory):
    name = factory.LazyAttribute(lambda x: faker.name())
    
    class Meta:
        model = Category
