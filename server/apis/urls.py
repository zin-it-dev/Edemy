from django.urls import path, include
from rest_framework import routers

from .apiviews import UserViewSet, CategoryViewSet, CourseViewSet
from .views import index, LineChartJSONView

app_name = 'apis'

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'courses', CourseViewSet, basename='course')

urlpatterns = [
    path("tasks/", index),
    path('', include(router.urls)),
    
    # Charts
    path('chart/courses', LineChartJSONView.as_view()),
]