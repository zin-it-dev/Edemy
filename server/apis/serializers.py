from rest_framework import serializers
from taggit.serializers import TagListSerializerField, TaggitSerializer

from .models import Category, Course, Comment


class BaseModelSerializer(serializers.ModelSerializer):        
    class Meta:
        fields = ['id', 'is_active']
        read_only_fields = ['is_active']
    
    
class SlugSerializer(BaseModelSerializer):        
    class Meta:
        fields = BaseModelSerializer.Meta.fields + ['slug']
            

class TagSerializer(TaggitSerializer, SlugSerializer):
    tags = TagListSerializerField()
    
    class Meta:
        fields = SlugSerializer.Meta.fields + ['tags']


class CategorySerializer(SlugSerializer):
    class Meta:
        model = Category
        fields = SlugSerializer.Meta.fields + ['name']


class CourseSerializer(TagSerializer):
    class Meta:
        model = Course
        fields = TagSerializer.Meta.fields + ['name']
        
        
class CommentSerializer(BaseModelSerializer):
    class Meta:
        model = Comment
        fields = BaseModelSerializer.Meta.fields + ['content']  