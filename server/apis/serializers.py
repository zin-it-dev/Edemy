from rest_framework import serializers

from .models import Category, Course, Comment, Tag


class GeneralSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ["id", "is_active"]
        read_only_fields = ["is_active"]


class GenericSerializer(GeneralSerializer):
    class Meta:
        fields = GeneralSerializer.Meta.fields + ["slug"]


class CategorySerializer(GenericSerializer):
    class Meta:
        model = Category
        fields = GenericSerializer.Meta.fields + ["name"]


class CourseSerializer(GenericSerializer):
    category = serializers.StringRelatedField(read_only=True)
    tags = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Course
        fields = GenericSerializer.Meta.fields + [
            "name",
            "description",
            "price",
            "category",
            "tags",
        ]


class CommentSerializer(GeneralSerializer):
    class Meta:
        model = Comment
        fields = GeneralSerializer.Meta.fields + ["content"]
