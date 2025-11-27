from rest_framework import viewsets, generics
from elasticsearch_dsl import Q
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import CategorySerializer, CourseSerializer, CommentSerializer
from .mixins import SearchMixin
from .repositories import CategoryRepository, CourseRepository, CommentRepository
from .paginatiors import StandardResultsSetPagination
from .documents import CourseDocument
from .filters import CourseFilter


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = CategoryRepository().load()
    serializer_class = CategorySerializer


class CourseViewSet(SearchMixin):
    queryset = CourseRepository().load()
    serializer_class = CourseSerializer
    document_class = CourseDocument
    pagination_class = StandardResultsSetPagination
    filterset_class = CourseFilter

    filter_backends = SearchMixin.filter_backends + [DjangoFilterBackend]
    search_fields = ["name", "description"]

    def generate_search_query(self, query):
        return Q(
            "multi_match",
            query=query,
            fields=[
                "name",
                "description",
            ],
            fuzziness="auto",
        )


class CommentViewSet(viewsets.ReadOnlyModelViewSet):
    # queryset = CommentRepository().load()
    serializer_class = CommentSerializer
