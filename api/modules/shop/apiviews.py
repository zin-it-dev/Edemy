from rest_framework import generics, viewsets

from .models import Category, Course
from .serializers import CategorySerializer, CourseSerializer


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    """
    API endpoint that allows `Category` to be viewed.
    This viewset automatically provides `list` actions.
    """

    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows `Course` to be viewed or edited.
    This viewset automatically provides `list` and `retrieve` actions.
    """

    queryset = Course.objects.all().order_by("-date_created")
    serializer_class = CourseSerializer
