from rest_framework import viewsets
from courses.models import Category, Course
from courses.serializers import CategorySerializer, CourseSerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """Read-only view set for categories"""

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
