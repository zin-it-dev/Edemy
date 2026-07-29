from rest_framework import routers
from django.conf import settings
from django.urls import include, path
from courses.apis.views import CategoryViewSet

router = routers.DefaultRouter() if settings.DEBUG else routers.SimpleRouter()
router.register(r'categories', CategoryViewSet, basename="category")

from django.http import JsonResponse
from django.db import connection

def db_version(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT version();")
        version = cursor.fetchone()[0]
    return JsonResponse({'version': version})

urlpatterns = [
    path('db/', db_version, name='db_version'),
    path('', include(router.urls)),
]