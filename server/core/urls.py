from django.contrib import admin
from django.urls import path, re_path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    
    re_path(r'^', include('apis.urls')),
    
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
