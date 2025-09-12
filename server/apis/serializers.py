from rest_framework import serializers

from .models import User, Category, Course


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
    category = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Course
        fields = SlugModelSerializer.Meta.fields + ['name', 'thumbnail', 'description', 'price', 'discount', 'category']