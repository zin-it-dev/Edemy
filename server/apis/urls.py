from django.urls import path, include
from rest_framework import routers

from .apiviews import UserViewSet, CategoryViewSet, CourseViewSet
from .views import index

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'courses', CourseViewSet, basename='course')

urlpatterns = [
    # path("", index, name="index"),
    path('', include(router.urls)),
]