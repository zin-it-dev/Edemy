from rest_framework import serializers
from libs.mixins.serializers import DynamicFieldsModelSerializer
from accounts.models import User


class UserSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {"password": {"write_only": True}}
