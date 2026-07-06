
from common.serializers import DynamicFieldsModelSerializer

from .models import Category, Course


class CategorySerializer(DynamicFieldsModelSerializer):
    class Meta(DynamicFieldsModelSerializer.Meta):
        model = Category


class CourseSerializer(DynamicFieldsModelSerializer):
    class Meta(DynamicFieldsModelSerializer.Meta):
        model = Course
