import factory

from faker import Factory as FakerFactory

from apis.models import Category, Course

faker = FakerFactory.create()

class CategoryFactory(factory.django.DjangoModelFactory):
    name = factory.LazyAttribute(lambda x: faker.name())
    
    class Meta:
        model = Category


class CourseFactory(factory.django.DjangoModelFactory):
    name = factory.LazyAttribute(lambda x: faker.name())
    
    class Meta:
        model = Course
