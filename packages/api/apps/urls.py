import inngest.django
from django.conf import settings
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter
from django.urls import include, path
from apps.client import inngest_client
from content.api.views import CategoryViewSet, CourseViewSet
from accounts.workflows import sync_user


router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("categories", CategoryViewSet, basename="category")
router.register("courses", CourseViewSet, basename="course")

urlpatterns = [
    path("", include(router.urls)),
    inngest.django.serve(
        inngest_client,
        [sync_user],
    ),
]