from rest_framework import serializers

from .models import Category, Course, Lesson, Module


class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['slug', 'is_active']


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ModelSerializer.Meta.fields + ['name']
        
        
class LessonSerializer(ModelSerializer):
    class Meta:
        model = Lesson
        fields = ModelSerializer.Meta.fields + ['name', 'order', 'content']


class CourseSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = ModelSerializer.Meta.fields + ['name', 'description']
    
    
class ModuleSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    
    class Meta:
        model = Module
        fields = ['id', 'name', 'order', 'lessons']
            

class AICourseSerializer(CourseSerializer):
    modules = ModuleSerializer(many=True, read_only=True)

    class Meta(CourseSerializer.Meta):
        model = CourseSerializer.Meta.model
        fields = CourseSerializer.Meta.fields + ['modules']
        

class AgentSerializer(serializers.Serializer):
    topic = serializers.CharField(max_length=255, required=True)
    level = serializers.ChoiceField(choices=['Beginner', 'Intermediate', 'Advanced'])
    chapters = serializers.IntegerField(min_value=1, max_value=20)
    duration = serializers.CharField(max_length=100, required=False, allow_blank=True)