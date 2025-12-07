from chartjs.views.lines import BaseLineChartView
from django.contrib.admin.views.decorators import staff_member_required
from django.http import JsonResponse

from .mixins import ColorMixin
from .utils import get_year, MONTHS
from .repositories import UserRepository


class CustomerGrowthJSONView(ColorMixin, BaseLineChartView):
    """
    A JSON view for generating customer growth data for a line chart.

    To use it, retrieves monthly customer registration counts, formats them against the months of the year and prepares the data (labels, providers, datasets).
    """

    def execute_query(self):
        results = get_year()

        for item in UserRepository().get_monthly_signups():
            results[MONTHS[item["month"] - 1]] = item["count"]
        return results

    def get_labels(self):
        return list(self.execute_query().keys())

    def get_providers(self):
        return ["Amount (Customer)"]

    def get_data(self):
        return [list(self.execute_query().values())]
