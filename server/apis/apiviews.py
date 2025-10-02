from rest_framework import viewsets

from .mixins import SlugFieldLookupMixin
from .repositories import CategoryRepository
from .serializers import CategorySerializer


class CategoryViewSet(SlugFieldLookupMixin):
    queryset = CategoryRepository().get_all()
    serializer_class = CategorySerializer