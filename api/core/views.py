from datetime import datetime

from chartjs.views.lines import BaseLineChartView
from django.contrib.admin.views.decorators import staff_member_required
from django.http import JsonResponse

from .mixins import StaffLoginRequiredMixin
from .repositories import UserRepository
from .utils import MONTHS, get_year


@staff_member_required
def get_filter_options(request):
    years = UserRepository().get_years()
    year_list = [y.year for y in years]
    return JsonResponse({"options": sorted(year_list, reverse=True)})


class UserRegistrationChartJSON(StaffLoginRequiredMixin, BaseLineChartView):
    def get_labels(self):
        group_by = self.request.GET.get("group_by", "month")
        if group_by == "quarter":
            return ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]
        return MONTHS

    def get_providers(self):
        year = self.request.GET.get("year", datetime.now().year)
        return [f"New user year {year}"]

    def get_data(self):
        year = int(self.request.GET.get("year", datetime.now().year))
        group_by = self.request.GET.get("group_by", "month")
        role = self.request.GET.get("role").upper()

        raw_data = UserRepository().monthly_registrations(
            year=year, group_by=group_by, role=role
        )

        if group_by == "quarter":
            results = {1: 0, 2: 0, 3: 0, 4: 0}
            for item in raw_data:
                results[item["quarter"]] = item["count"]
            return [list(results.values())]
        else:
            results = get_year()
            for item in raw_data:
                results[MONTHS[item["month"] - 1]] = item["count"]
            return [list(results.values())]
