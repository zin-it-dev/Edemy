import inngest.django
from rest_framework import routers
from django.conf import settings
from django.urls import include, path
from accounts.functions import sync_user
from courses.apis.views import CategoryViewSet
from common.client import inngest_client

router = routers.DefaultRouter() if settings.DEBUG else routers.SimpleRouter()
router.register(r"categories", CategoryViewSet, basename="category")

urlpatterns = [
    path("", include(router.urls)),
    inngest.django.serve(
        inngest_client,
        [sync_user],
    ),
]
