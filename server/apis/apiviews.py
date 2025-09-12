from rest_framework import viewsets, status, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie, vary_on_headers
from elasticsearch_dsl import Q
from drf_spectacular.utils import extend_schema, OpenApiParameter

from .serializers import UserSerializer, CategorySerializer, CourseSerializer
from .repositories import UserRepository, CategoryRepository, CourseRepository
from .mixins import SearchViewSet
from .documents import CourseDocument
from .paginatiors import StandardResultsSetPagination
from .filters import CourseFilter

class UserViewSet(viewsets.GenericViewSet):
    queryset = UserRepository().get_all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    @method_decorator(cache_page(60 * 60 * 2))
    @method_decorator(vary_on_cookie)
    @method_decorator(vary_on_headers("Authorization"))
    @action(detail=False, url_path='current-user',  methods=['GET'])
    def current_user(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class CategoryViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    queryset = CategoryRepository().get_all()
    serializer_class = CategorySerializer
    
    # @method_decorator(cache_page(60 * 5, key_prefix='category_list'))
    # def list(self, request, *args, **kwargs):
    #     return super().list(request, *args, **kwargs)
    
    
class CourseViewSet(SearchViewSet):
    queryset = CourseRepository().get_all()
    serializer_class = CourseSerializer
    document_class = CourseDocument
    filterset_class = CourseFilter
    pagination_class = StandardResultsSetPagination
    
    def generate_q_expression(self, query):
        return Q(
            "multi_match", query=query,
            fields=[
                "name",
                "description",
            ], fuzziness="auto")
    
    # @extend_schema(
    #     parameters=[
    #         OpenApiParameter(
    #             name="search",
    #             type=str,
    #             location=OpenApiParameter.QUERY,
    #             description="A search term.",
    #             required=False,
    #         )
    #     ]
    # )
    # @method_decorator(cache_page(60 * 5, key_prefix='course_list'))
    # def list(self, request, *args, **kwargs):
    #     return super().list(request, *args, **kwargs)
    
    # @method_decorator(cache_page(60 * 5, key_prefix='course_trieve'))
    # def retrieve(self, request, *args, **kwargs):
    #     return super().retrieve(request, *args, **kwargs)