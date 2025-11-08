from rest_framework import viewsets, generics

from .models import Category, Course, Comment
from .serializers import CategorySerializer, CourseSerializer, CommentSerializer
from .mixins import ReadOnlyViewSet

class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
    
class CourseViewSet(ReadOnlyViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    
    
class CommentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer