from django.db.models import Model, Count
from django.db.models.functions import ExtractMonth
from django.core.exceptions import ObjectDoesNotExist
from datetime import date
from django.db import transaction

from .models import User, Category, Course, Comment, Lesson


class GenericRepository:
    """Repository pattern provide generic CRUD operations that can be reused across different models."""

    def __init__(self, model: Model):
        self.model = model

    def get_all(self):
        return self.model.objects.filter(is_removed=False).all()

    def get_by_props(self, **kwargs):
        try:
            return self.model.objects.get(**kwargs)
        except ObjectDoesNotExist:
            return None

    @transaction.atomic
    def create(self, **kwargs):
        return self.model.objects.create(**kwargs)

    @transaction.atomic
    def update(self, lookup: dict, **kwargs):
        obj = self.get_by_props(lookup)
        if obj:
            for key, value in kwargs.items():
                setattr(obj, key, value)
            obj.save()
            return obj
        return None

    @transaction.atomic
    def delete(self, **kwargs):
        obj = self.get_by_props(**kwargs)
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

    def get_latest(self):
        return (
            self.model.objects.filter(is_removed=False)
            .select_related("category")
            .all()
            .order_by("-created")
        )


class UserRepository(GenericRepository):
    def __init__(self):
        super().__init__(User)

    def get_all(self):
        return self.model.objects.filter(is_active=True).all()

    def get_or_create(self, email, **kwargs):
        defaults = {k: v for k, v in kwargs.items() if k != 'email'}
        return self.model.objects.get_or_create(
            email=email,
            defaults=defaults
        )

    def get_monthly_signups(self):
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

    def get_latest(self, obj_uri):
        return (
            self.model.objects.filter(course__slug=obj_uri, is_removed=False)
            .all()
            .order_by("-created")
        )


class LessonRepository(GenericRepository):
    def __init__(self):
        super().__init__(Lesson)

    def get_latest(self, obj_uri):
        return (
            self.model.objects.filter(course__slug=obj_uri, is_removed=False)
            .prefetch_related("tags")
            .all()
            .order_by("-created")
        )
