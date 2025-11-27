from django.db.models import Model, Count
from django.db.models.functions import ExtractMonth
from django.core.exceptions import ObjectDoesNotExist
from datetime import date

from .models import User, Category, Course, Comment


class GenericRepository:
    def __init__(self, model: Model):
        self.model = model

    def load(self):
        return self.model.objects.filter(is_active=True).all()

    def fetch(self, obj_id):
        try:
            return self.model.objects.get(id=obj_id)
        except ObjectDoesNotExist:
            return None

    def create(self, **kwargs):
        return self.model.objects.create(**kwargs)

    def update(self, obj_id, **kwargs):
        obj = self.fetch(obj_id)
        if obj:
            for key, value in kwargs.items():
                setattr(obj, key, value)
            obj.save()
            return obj
        return None

    def delete(self, obj_id):
        obj = self.fetch(obj_id)
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
            self.model.objects.filter(is_active=True)
            .prefetch_related("tags")
            .select_related("category")
            .all()
            .order_by("-date_created")
        )


class UserRepository(GenericRepository):
    def __init__(self):
        super().__init__(User)

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
        return self.model.objects.filter(course__slug=obj_uri, is_active=True)

    def fetch(self, pk, obj_uri):
        return self.model.objects.filter(pk=pk, course__slug=obj_uri, is_active=True)
