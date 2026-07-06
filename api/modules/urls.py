import inngest.django
from authentication.apiviews import UserViewSet
from authentication.workflows import sync_user
from common.client import inngest_client
from django.urls import include, path
from rest_framework import routers
from shop.apiviews import CategoryViewSet, CourseViewSet

router = routers.DefaultRouter()
router.register(r"users", UserViewSet, basename="user")
router.register(r"categories", CategoryViewSet, basename="category")
router.register(r"courses", CourseViewSet, basename="course")

urlpatterns = [
    path("", include(router.urls)),
    inngest.django.serve(
        inngest_client,
        [sync_user],
    ),
]
