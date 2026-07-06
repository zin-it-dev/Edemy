from api.modules.common.repositories import GenericQueryRepository
from django.db.models import Count
from django.db.models.functions import ExtractMonth, ExtractQuarter

from .models import Roles, User


class UserRepository(GenericQueryRepository):
    def __init__(self):
        super().__init__(User)

    def select_year(self):
        return self.model.objects.filter(is_staff=False).dates("date_joined", "year")

    def stats_account(self, year=None, group_by="month", role=None):
        if role in [Roles.USER, Roles.TEACHER]:
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
