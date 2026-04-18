from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

urlpatterns = [
    re_path(r"^admin/", admin.site.urls),
    # APIs
    re_path(r"^", include("app.urls")),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    # Swagger
    path("swagger-json/", SpectacularAPIView.as_view(), name="schema"),
    path("docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="docs"),
    path("redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]

if settings.DEBUG and not settings.TESTING:
    urlpatterns += [
        path("__debug__/", include("debug_toolbar.urls")),
    ]
