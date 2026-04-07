from django.conf import settings
from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.urls import include, path, re_path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

urlpatterns = [
    # I18N
    path("i18n/", include("django.conf.urls.i18n")),

    # APIs
    re_path(r"^", include("app.urls")),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    
    # Swagger
    path("swagger-json/", SpectacularAPIView.as_view(), name="schema"),
]

urlpatterns += i18n_patterns(
    # Admin
    re_path(r"^admin/docs/", include("django.contrib.admindocs.urls")),
    re_path(r"^admin/", admin.site.urls),
    
    # Swagger
    path("docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="docs"),
    path("redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),

    prefix_default_language=True
)

if settings.DEBUG and not settings.TESTING:
    urlpatterns += [
        path("__debug__/", include("debug_toolbar.urls")),
    ]
