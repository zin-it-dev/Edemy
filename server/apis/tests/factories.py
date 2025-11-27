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
    description = factory.LazyAttribute(lambda x: faker.text())
    price = factory.LazyAttribute(
        lambda x: round(
            faker.pydecimal(left_digits=3, right_digits=2, positive=True), 2
        )
    )
    category = factory.SubFactory(CategoryFactory)

    class Meta:
        model = Course
