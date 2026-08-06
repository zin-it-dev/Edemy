from rest_framework import viewsets
from courses.apis.serializers import CategorySerializer
from courses.models import Category


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
