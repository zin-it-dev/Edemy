from django.urls import path, include
from rest_framework import routers

from .apiviews import CategoryViewSet, CourseViewSet, CommentViewSet

app_name = "apis"

router = routers.DefaultRouter()
router.register(r"categories", CategoryViewSet, basename="category")
router.register("courses", CourseViewSet, basename="course")
router.register("comments", CommentViewSet, basename="comment")

urlpatterns = [
    path("", include(router.urls))
]
