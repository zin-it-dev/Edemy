from django.conf import settings
from django.contrib import admin
from django.urls import path, re_path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView

urlpatterns = [
    path("i18n/", include("django.conf.urls.i18n"), name="set_language"),
    path('admin/', admin.site.urls),
    
    # APIs
    re_path(r'^', include('apis.urls')),
    
    # CKEditor
    re_path(r'^ckeditor/', include('ckeditor_uploader.urls')),
    
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    
    # Swagger
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]

if settings.DEBUG:
    urlpatterns += [
        path("__debug__/", include("debug_toolbar.urls")),
        path('silk/', include('silk.urls', namespace='silk'))
    ]
