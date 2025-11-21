from django.urls import path, include
from rest_framework import routers
from django.contrib.admin.views.decorators import staff_member_required

from .apiviews import CategoryViewSet, CourseViewSet, CommentViewSet
from .views import CustomerGrowthJSONView

app_name = "apis"

router = routers.DefaultRouter()
router.register(r"categories", CategoryViewSet, basename="category")
router.register("courses", CourseViewSet, basename="course")
router.register("comments", CommentViewSet, basename="comment")

urlpatterns = [
    path("", include(router.urls)),
    path(
        "statistics/customer-growth/",
        staff_member_required(CustomerGrowthJSONView.as_view()),
        name="customer_growth",
    )
]
