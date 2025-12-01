from django.db.models import Model, Count
from django.db.models.functions import ExtractMonth
from django.core.exceptions import ObjectDoesNotExist
from datetime import date

from .models import User, Category, Course, Comment, Lesson


class GenericRepository:
    def __init__(self, model: Model):
        self.model = model

    def load(self):
        return self.model.objects.filter(is_removed=False).all()

    def fetch(self, **kwargs):
        try:
            return self.model.objects.get(**kwargs)
        except ObjectDoesNotExist:
            return None

    def create(self, **kwargs):
        return self.model.objects.create(**kwargs)

    def update(self, **kwargs):
        obj = self.fetch(key=kwargs.get("key"), **kwargs)
        if obj:
            for key, value in kwargs.items():
                setattr(obj, key, value)
            obj.save()
            return obj
        return None

    def delete(self, **kwargs):
        obj = self.fetch(**kwargs)
        if obj:
            obj.delete()
            return True
        return False


class CategoryRepository(GenericRepository):
    def __init__(self):
        super().__init__(Category)


class CourseRepository(GenericRepository):
    def __init__(self):
        super().__init__(Course)

    def load(self):
        return (
            self.model.objects.filter(is_removed=False)
            .select_related("category")
            .all()
            .order_by("-created")
        )


class UserRepository(GenericRepository):
    def __init__(self):
        super().__init__(User)

    def load(self):
        return self.model.objects.filter(is_active=True).all()

    def fetch_growth(self):
        return (
            self.model.objects.filter(
                is_staff=False, date_joined__year=date.today().year
            )
            .annotate(month=ExtractMonth("date_joined"))
            .values("month")
            .annotate(count=Count("pk"))
            .order_by("month")
        )


class CommentRepository(GenericRepository):
    def __init__(self):
        super().__init__(Comment)

    def load(self, obj_uri):
        return (
            self.model.objects.filter(course__slug=obj_uri, is_removed=False)
            .all()
            .order_by("-created")
        )


class LessonRepository(GenericRepository):
    def __init__(self):
        super().__init__(Lesson)

    def load(self, obj_uri):
        return (
            self.model.objects.filter(course__slug=obj_uri, is_removed=False)
            .prefetch_related("tags")
            .all()
            .order_by("-created")
        )
