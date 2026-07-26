import inngest.django
from django.conf import settings
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter
from django.urls import include, path
from config.client import inngest_client
from accounts.workflows import sync_user
from accounts.api.views import UserViewSet
from courses.api.views import CategoryViewSet

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register(r"users", UserViewSet, basename="user")
router.register("categories", CategoryViewSet, basename="category")
# router.register("courses", CourseViewSet, basename="course")

urlpatterns = [
    path("", include(router.urls)),
    inngest.django.serve(
        inngest_client,
        [sync_user],
    ),
]
