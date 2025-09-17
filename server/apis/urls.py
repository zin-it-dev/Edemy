from django.urls import path, include
from rest_framework_nested import routers

from .apiviews import UserViewSet, CategoryViewSet, CourseViewSet, LessonViewSet
from .views import index, LineChartJSONView

app_name = 'apis'

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'courses', CourseViewSet, basename='course')

courses_router = routers.NestedSimpleRouter(router, r'courses', lookup='course')
courses_router.register(r'lessons', LessonViewSet, basename='lessons')

urlpatterns = [
    path("tasks/", index),
    path(r'', include(router.urls)),
    path(r'', include(courses_router.urls)),
    
    # Charts
    path('chart/courses', LineChartJSONView.as_view()),
]