from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Count, Model
from django.db.models.functions import ExtractMonth, ExtractQuarter

from .models import User


class GenericRepository:
    def __init__(self, model: Model):
        self.model = model

    def select_all(self):
        return self.model.objects.filter(is_removed=False).all()

    def select(self, **kwargs):
        try:
            return self.model.objects.get(**kwargs)
        except ObjectDoesNotExist:
            return None

    def insert(self, **kwargs):
        return self.model.objects.create(**kwargs)

    def update(self, **kwargs):
        obj = self.select(key=kwargs.get("key"), **kwargs)
        if obj:
            for key, value in kwargs.items():
                setattr(obj, key, value)
            obj.save()
            return obj
        return None

    def delete(self, **kwargs):
        obj = self.select(**kwargs)
        if obj:
            obj.soft_deleted()
            return True
        return False


class UserRepository(GenericRepository):
    def __init__(self):
        super().__init__(User)

    def select_all(self):
        return self.model.objects.filter(is_active=True).all()

    def get_years(self):
        return self.model.objects.filter(is_staff=False).dates("date_joined", "year")

    def monthly_registrations(self, year=None, group_by="month", role=None):
        if role in [User.Roles.USER, User.Roles.TEACHER]:
            roles = [role]

        query = self.model.objects.filter(date_joined__year=year, role__in=roles)

        if group_by == "quarter":
            query = (
                query.annotate(quarter=ExtractQuarter("date_joined"))
                .values("quarter")
                .annotate(count=Count("pk"))
                .order_by("quarter")
            )
        else:
            query = (
                query.annotate(month=ExtractMonth("date_joined"))
                .values("month")
                .annotate(count=Count("pk"))
                .order_by("month")
            )

        return query.distinct()
