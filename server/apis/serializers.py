from rest_framework import serializers
from taggit.serializers import TagListSerializerField, TaggitSerializer

from .models import Category, Course, Comment, User, Lesson


class GenericSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ["id", "slug"]


class CategorySerializer(GenericSerializer):
    class Meta:
        model = Category
        fields = GenericSerializer.Meta.fields + ["name"]


class CourseSerializer(GenericSerializer):
    category = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Course
        fields = GenericSerializer.Meta.fields + [
            "name",
            "description",
            "price",
            "photo",
            "category",
        ]


class TagSerializer(TaggitSerializer):
    tags = TagListSerializerField()

    class Meta:
        fields = ["tags"]


class LessonSerializer(TagSerializer, GenericSerializer):
    class Meta:
        model = Lesson
        fields = GenericSerializer.Meta.fields + ["name"] + TagSerializer.Meta.fields


class CourseDetailSerializer(TagSerializer, CourseSerializer):
    class Meta:
        model = CourseSerializer.Meta.model
        fields = CourseSerializer.Meta.fields + TagSerializer.Meta.fields


class LessonDetailSerializer(LessonSerializer):
    class Meta(LessonSerializer.Meta):
        fields = LessonSerializer.Meta.fields + ["content"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            "first_name",
            "last_name",
            "email",
        ]


class CommentSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "content", "creator", "created"]
