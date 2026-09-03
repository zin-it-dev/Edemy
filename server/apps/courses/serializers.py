from rest_framework import serializers
from courses.models import Category, Course
from libs.mixins.serializers import DynamicFieldsModelSerializer


class CategorySerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        read_only_fields = ["date_created", "date_updated"]


class CourseSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"
        read_only_fields = ["date_created", "date_updated"]
