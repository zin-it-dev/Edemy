from rest_framework import serializers

from ..models import Category, Course


class CategorySerializer(serializers.ModelSerializer):
    courses = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='title'
    )
    
    class Meta:
        model = Category
        fields = "__all__"


class CourseSerializer(serializers.HyperlinkedModelSerializer):
    categories = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    
    class Meta:
        model = Course
        fields = "__all__"
