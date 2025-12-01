from elasticsearch_dsl import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework import viewsets, mixins, status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_extensions.cache.mixins import CacheResponseMixin

from .serializers import (
    CategorySerializer,
    CourseSerializer,
    CourseDetailSerializer,
    CommentSerializer,
    UserSerializer,
    LessonSerializer,
    LessonDetailSerializer,
)
from .mixins import ReadOnlyCachedViewSet, OrderingMixin, SearchMixin
from .repositories import (
    CategoryRepository,
    CourseRepository,
    CommentRepository,
    UserRepository,
    LessonRepository,
)
from .paginatiors import StandardResultsSetPagination, LargeResultsSetPagination
from .documents import CourseDocument
from .filters import CourseFilter


class CategoryViewSet(CacheResponseMixin, viewsets.ViewSet, generics.ListAPIView):
    queryset = CategoryRepository().load()
    serializer_class = CategorySerializer
    list_cache_timeout = 60 * 30


class CourseViewSet(ReadOnlyCachedViewSet, SearchMixin, OrderingMixin):
    queryset = CourseRepository().load()
    queryset_detail = queryset.prefetch_related("tags")
    serializer_class = CourseSerializer
    serializer_detail_class = CourseDetailSerializer
    document_class = CourseDocument
    pagination_class = StandardResultsSetPagination
    filterset_class = CourseFilter
    filter_backends = (
        SearchMixin.filter_backends
        + OrderingMixin.filter_backends
        + [DjangoFilterBackend]
    )

    list_cache_timeout = 60 * 15
    object_cache_timeout = 60 * 30
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


class CommentViewSet(CacheResponseMixin, viewsets.ModelViewSet, OrderingMixin):
    serializer_class = CommentSerializer
    pagination_class = StandardResultsSetPagination

    list_cache_timeout = 60

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        return CommentRepository().load(obj_uri=self.kwargs["course_slug"])

    def perform_create(self, serializer):
        serializer.save(
            creator=self.request.user,
            course=CourseRepository().fetch(slug=self.kwargs["course_slug"]),
        )


class LessonViewSet(ReadOnlyCachedViewSet, OrderingMixin):
    serializer_class = LessonSerializer
    serializer_detail_class = LessonDetailSerializer
    pagination_class = StandardResultsSetPagination

    list_cache_timeout = 60 * 15
    object_cache_timeout = 60 * 30

    def get_queryset(self):
        return LessonRepository().load(obj_uri=self.kwargs["course_slug"])


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = UserRepository().load()
    serializer_class = UserSerializer
