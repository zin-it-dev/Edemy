from rest_framework import routers
from django.conf import settings
from django.urls import include, path
from courses.apis.views import CategoryViewSet

router = routers.DefaultRouter() if settings.DEBUG else routers.SimpleRouter()
router.register(r'categories', CategoryViewSet, basename="category")

urlpatterns = [
    path('', include(router.urls)),
]