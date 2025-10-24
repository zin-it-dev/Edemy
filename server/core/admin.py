from django.contrib.admin import AdminSite as BaseAdminSite
from django.urls import path, reverse, include
from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render
from django.utils.translation import gettext_lazy as _

@staff_member_required
def admin_statistics(request):
    return render(request, "admin/statistics.html", {
        "title": _("Charts")
    })
    

class AdminSite(BaseAdminSite):
    def get_urls(self):
        urls = super().get_urls()
        urls += [
            path(
                "statistics/", 
                admin_statistics, 
                name="admin_statistics"
            )
        ]
        return urls