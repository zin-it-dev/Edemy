from django.contrib.admin import AdminSite as BaseAdminSite
from django.urls import path, reverse, include
from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render
from django.utils.translation import gettext_lazy as _


@staff_member_required
def admin_statistics(request):
    """
    Display a statistics admin/staff site.

    **Context**

    ``title``
        An title of admin/staff site.

    **Template:**

    :template:`admin/statistics.html`
    """
    context = {"title": _("Statistics")}
    return render(request, "admin/statistics.html", context)


class AdminSite(BaseAdminSite):
    def get_app_list(self, request, _=None):
        app_list = super().get_app_list(request)
        app_list += [
            {
                "name": "Analytics and statistics",
                "app_label": "statistics",
                "models": [
                    {
                        "name": "Statistics",
                        "object_name": "statistics",
                        "admin_url": reverse("statistics"),
                        "view_only": True,
                    }
                ],
            }
        ]
        return app_list

    def get_urls(self):
        urls = super().get_urls()
        urls += [path("statistics/", admin_statistics, name="statistics")]
        return urls
