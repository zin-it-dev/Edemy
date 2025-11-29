import factory

from faker import Factory as FakerFactory

from apis.models import Category, Course, Lesson

faker = FakerFactory.create()


class GenericFactory(factory.django.DjangoModelFactory):
    name = factory.LazyAttribute(lambda x: faker.name())

    class Meta:
        abstract = True


class CategoryFactory(GenericFactory):
    class Meta:
        model = Category


class CourseFactory(GenericFactory):
    description = factory.LazyAttribute(lambda x: faker.text())
    price = factory.LazyAttribute(
        lambda x: round(
            faker.pydecimal(left_digits=3, right_digits=2, positive=True), 2
        )
    )
    category = factory.SubFactory(CategoryFactory)

    class Meta:
        model = Course


class LessonFactory(GenericFactory):
    content = factory.LazyAttribute(lambda x: faker.text())
    course = factory.SubFactory(CourseFactory)

    class Meta:
        model = Lesson
