from django.conf import settings
from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import include, path, re_path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from configs.admin import analytics_dashboard, statistics_dashboard

extra_patterns = [
    re_path(r"^doc/", include("django.contrib.admindocs.urls")),
    path(
        "password_reset/",
        auth_views.PasswordResetView.as_view(
            extra_context={"site_header": admin.site.site_header}
        ),
        name="admin_password_reset",
    ),
    path(
        "password_reset/done/",
        auth_views.PasswordResetDoneView.as_view(
            extra_context={"site_header": admin.site.site_header}
        ),
        name="password_reset_done",
    ),
    path(
        "analytics/", admin.site.admin_view(analytics_dashboard), name="admin_analytics"
    ),
    path(
        "statistics/",
        admin.site.admin_view(statistics_dashboard),
        name="admin_statistics",
    ),
    re_path(r"^", admin.site.urls),
]

urlpatterns = [
    path("i18n/", include("django.conf.urls.i18n")),
    # Admin
    re_path(r"^admin/", include(extra_patterns)),
    path(
        "reset/<uidb64>/<token>/",
        auth_views.PasswordResetConfirmView.as_view(
            extra_context={"site_header": admin.site.site_header}
        ),
        name="password_reset_confirm",
    ),
    path(
        "reset/done/",
        auth_views.PasswordResetCompleteView.as_view(
            extra_context={"site_header": admin.site.site_header}
        ),
        name="password_reset_complete",
    ),
    # APIs
    re_path(r"^", include("core.urls")),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("openapi/", SpectacularAPIView.as_view(), name="schema"),
]

urlpatterns += i18n_patterns(
    # Swagger
    path("docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="docs"),
    path("redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
    prefix_default_language=True,
)

if settings.DEBUG and not settings.TESTING:
    import debug_toolbar

    urlpatterns += [
        path("__debug__/", include(debug_toolbar.urls)),
        re_path(r"^silk", include("silk.urls", namespace="silk")),
    ]
