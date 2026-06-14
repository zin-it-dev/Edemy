import inngest.django
from django.urls import include, path, re_path
from rest_framework import routers

from .apiviews import CategoryViewSet, CourseViewSet, UserViewSet
from .client import inngest_client
from .views import UserRegistrationChartJSON, get_filter_options
from .workflows import sync_user

router = routers.DefaultRouter()
router.register(r"users", UserViewSet, basename="user")
router.register(r"categories", CategoryViewSet, basename="category")
router.register(r"courses", CourseViewSet, basename="course")

extra_patterns = [
    path(
        "new-users/",
        UserRegistrationChartJSON.as_view(),
        name="chart_monthly_registrations",
    ),
    path("filter-options/", get_filter_options, name="chart_filter_options"),
]

urlpatterns = [
    path("", include(router.urls)),
    re_path(r"^charts/", include(extra_patterns)),
    inngest.django.serve(
        inngest_client,
        [sync_user],
    ),
]
