from django.contrib import admin
from django.urls import path, re_path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from django.contrib.auth import views as auth_views
from django.conf import settings

from core.admin import admin_statistics

urlpatterns = [
    # Admin
    path('admin/doc/', include('django.contrib.admindocs.urls')),
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
    path(
        "admin/statistics",
        admin.site.admin_view(admin_statistics),
        name="admin_statistics"
    ),
    path('admin/', admin.site.urls),
    
    # CKEditor
    path('ckeditor/', include('ckeditor_uploader.urls')),
    
    # Core
    re_path(r'^', include('apis.urls')),
    
    # Auth
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    
    # Swagger
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]

if settings.DEBUG or settings.TESTING:
    import debug_toolbar
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
        path('silk/', include('silk.urls', namespace='silk'))
    ]