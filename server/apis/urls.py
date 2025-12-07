from django.urls import path, include
from rest_framework_nested import routers
from django.contrib.admin.views.decorators import staff_member_required

from .apiviews import (
    CategoryViewSet,
    CourseViewSet,
    CommentViewSet,
    UserViewSet,
    LessonViewSet,
)
from .views import CustomerGrowthJSONView
from .webhooks import ClerkWebhookAPIView

app_name = "apis"

router = routers.DefaultRouter()
router.register(r"categories", CategoryViewSet, basename="category")
router.register(r"courses", CourseViewSet, basename="course")
router.register(r"users", UserViewSet, basename="user")

courses_router = routers.NestedSimpleRouter(router, r"courses", lookup="course")
courses_router.register(r"comments", CommentViewSet, basename="course-comments")
courses_router.register(r"lessons", LessonViewSet, basename="lesson")

urlpatterns = [
    path(r"", include(router.urls)),
    path(r"", include(courses_router.urls)),
    path("webhooks/", ClerkWebhookAPIView.as_view(), name="clerk_webhook"),
    path(
        "statistics/customer-growth/",
        staff_member_required(CustomerGrowthJSONView.as_view()),
        name="customer_growth",
    ),
]
