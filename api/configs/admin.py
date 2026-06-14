from django.contrib.admin import AdminSite as BaseAdminSite
from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render
from django.urls import path, reverse
from django.utils.translation import gettext_lazy as _


@staff_member_required
def statistics_dashboard(request):
    return render(request, "admin/statistics.html", {"title": _("Statistics")})


@staff_member_required
def analytics_dashboard(request):
    return render(request, "admin/analytics.html", {"title": _("Analytics")})


class AdminSite(BaseAdminSite):
    def get_app_list(self, request, app_label=None):
        app_list = super().get_app_list(request, app_label)
        app_list += [
            {
                "app_label": "analytics",
                "name": _("Analytics and statistics"),
                "has_module_perms": request.user.is_staff,
                "models": [
                    {
                        "object_name": "analytics",
                        "name": _("Analytics"),
                        "admin_url": reverse("admin_analytics"),
                        "view_only": True,
                    },
                    {
                        "object_name": "statistics",
                        "name": _("Statistics"),
                        "admin_url": reverse("admin_statistics"),
                        "view_only": True,
                    },
                ],
            }
        ]
        return app_list

    def get_urls(self):
        urls = super().get_urls()
        urls += [
            path(
                "analytics/",
                self.admin_view(analytics_dashboard),
                name="admin_analytics",
            ),
            path(
                "statistics/",
                self.admin_view(statistics_dashboard),
                name="admin_statistics",
            ),
        ]
        return urls
