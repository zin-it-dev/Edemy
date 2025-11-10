from datetime import date
from chartjs.views.lines import BaseLineChartView
from django.contrib.admin.views.decorators import staff_member_required
from django.db.models import Count
from django.db.models.functions import ExtractMonth
from django.http import JsonResponse

from .mixins import ColorMixin
from .models import User
from .utils import get_year, MONTHS


class CustomerGrowthJSONView(ColorMixin, BaseLineChartView):
    def execute_query(self):
        query = (
            User.objects.filter(is_staff=False, date_joined__year=date.today().year)
            .annotate(month=ExtractMonth("date_joined"))
            .values("month")
            .annotate(count=Count("pk"))
            .order_by("month")
        )

        results = get_year()

        for item in query:
            results[MONTHS[item["month"] - 1]] = item["count"]
        return results

    def get_labels(self):
        return list(self.execute_query().keys())

    def get_providers(self):
        return ["Amount (Customer)"]

    def get_data(self):
        return [list(self.execute_query().values())]
