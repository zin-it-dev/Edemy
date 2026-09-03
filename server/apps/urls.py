import inngest.django
from django.conf import settings
from django.urls import include, path
from rest_framework.routers import DefaultRouter, SimpleRouter
from core.client import inngest_client
from accounts.tasks import sync_user_from_clerk
from accounts.apiviews import UserViewSet
from courses.apiviews import CategoryViewSet


router = DefaultRouter() if settings.DEBUG else SimpleRouter()
router.register("users", UserViewSet, basename="user")
router.register("categories", CategoryViewSet, basename="category")

urlpatterns = [
    inngest.django.serve(
        inngest_client,
        [sync_user_from_clerk],
    ),
    path("", include(router.urls)),
]
