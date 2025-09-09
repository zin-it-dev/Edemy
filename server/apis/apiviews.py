from rest_framework import viewsets, status, mixins, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import User
from .serializers import UserSerializer, CategorySerializer, CourseSerializer
from .repositories import UserRepository, CategoryRepository, CourseRepository


class UserViewSet(viewsets.GenericViewSet):
    queryset = UserRepository().get_all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, url_path='current-user',  methods=['GET'])
    def current_user(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class CategoryViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    queryset = CategoryRepository().get_all()
    serializer_class = CategorySerializer
    
    
class ReadOnlyModelViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = 'slug'


class CourseViewSet(ReadOnlyModelViewSet):
    queryset = CourseRepository().get_all()
    serializer_class = CourseSerializer
    filter_backends = [filters.OrderingFilter]