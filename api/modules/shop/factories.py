import factory
from common.factories import GenericFactory
from faker import Factory as FakerFactory

from .models import Category, Course

faker = FakerFactory.create()


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

    class Meta:
        model = Course
        
    @factory.post_generation
    def categories(self, create, extracted, **kwargs):
        if not create:
            return

        if extracted:
            for category in extracted:
                self.categories.add(category)
        else:
            self.categories.add(CategoryFactory(), CategoryFactory())