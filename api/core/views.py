from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render
from django.utils.translation import gettext_lazy as _


@staff_member_required
def statistics_dashboard(request):
    return render(request, "admin/statistics.html", {"title": _("Statistics")})
