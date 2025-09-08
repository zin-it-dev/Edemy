from rest_framework import viewsets, status, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import User
from .serializers import UserSerializer, CategorySerializer, CourseSerializer
from .repositories import UserRepository, CategoryRepository, CourseRepository


class UserViewSet(viewsets.ModelViewSet):
    queryset = UserRepository().get_all()
    serializer_class = UserSerializer
    
    def get_permissions(self):
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    @action(detail=False, url_path='current-user',  methods=['GET'])
    def current_user(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class CategoryViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    queryset = CategoryRepository().get_all()
    serializer_class = CategorySerializer
    
    
class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CourseRepository().get_all()
    serializer_class = CourseSerializer