from django.conf import settings
from django.contrib import admin
from django.urls import path, re_path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)
from django.contrib.auth import views as auth_views
from django.conf.urls.i18n import i18n_patterns

from core.admin import admin_statistics

urlpatterns = [
    path("i18n/", include("django.conf.urls.i18n"), name="set_language"),
    
    # Admin
    path("admin/docs/", include("django.contrib.admindocs.urls")),
    path(
        "admin/statistics",
        admin.site.admin_view(admin_statistics),
        name="admin_statistics",
    ),
]

urlpatterns += i18n_patterns(
    # Admin
    path(
        "admin/password_reset/",
        auth_views.PasswordResetView.as_view(
            extra_context={"site_header": admin.site.site_header}
        ),
        name="admin_password_reset",
    ),
    path(
        "admin/password_reset/done/",
        auth_views.PasswordResetDoneView.as_view(
            extra_context={"site_header": admin.site.site_header}
        ),
        name="password_reset_done",
    ),
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
    path("admin/", admin.site.urls),
    
    # APIs
    re_path(r"^", include("apis.urls")),
    
    # CKEditor
    re_path(r"^ckeditor/", include("ckeditor_uploader.urls")),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    
    # Swagger
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    path("docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
)

if settings.DEBUG:
    urlpatterns += [
        path("__debug__/", include("debug_toolbar.urls")),
        path("silk/", include("silk.urls", namespace="silk")),
    ]
