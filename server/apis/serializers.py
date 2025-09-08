from rest_framework import serializers

from .models import User, Category, Course


class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['id', 'is_active']


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ModelSerializer.Meta.fields + ['username', 'email', 'picture', 'first_name', 'last_name']
        
        
class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ModelSerializer.Meta.fields + ['name']
        
        
class CourseSerializer(ModelSerializer):
    category = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Course
        fields = ModelSerializer.Meta.fields + ['name', 'thumbnail', 'description', 'price', 'discount', 'category']