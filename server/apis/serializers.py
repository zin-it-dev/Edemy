from rest_framework import serializers

from .models import User, Category, Course, Lesson


class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['id', 'is_active']


class SlugModelSerializer(ModelSerializer):
    class Meta(ModelSerializer.Meta):
        fields = ModelSerializer.Meta.fields + ['slug']


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ModelSerializer.Meta.fields + ['username', 'email', 'picture', 'first_name', 'last_name']
        
        
class CategorySerializer(SlugModelSerializer):
    class Meta:
        model = Category
        fields = SlugModelSerializer.Meta.fields + ['name']
        
        
class CourseSerializer(SlugModelSerializer):    
    class Meta:
        model = Course
        fields = SlugModelSerializer.Meta.fields + ['name', 'thumbnail', 'description']
        
        
class LessonSerializer(SlugModelSerializer):
    class Meta:
        model = Lesson
        fields = SlugModelSerializer.Meta.fields + ['name', 'content', 'url']