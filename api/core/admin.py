from django.contrib.admin import AdminSite as BaseAdminSite
from django.urls import path, reverse
from django.utils.translation import gettext_lazy as _

from .views import statistics_dashboard


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
                "statistics/",
                self.admin_view(statistics_dashboard),
                name="admin_statistics",
            ),
        ]
        return urls
