from rest_framework import serializers

from .models import Category


class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['url', 'is_active']


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = ModelSerializer.Meta.fields + ['name']