from rest_framework import serializers

from .models import Category, Course, User


class GenericModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `exclude` argument
    that controls which fields should be dropped from the serializer.
    """

    class Meta:
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        exclude = kwargs.pop("exclude", None)
        fields = kwargs.pop("fields", None)

        super().__init__(*args, **kwargs)

        if exclude is not None:
            for field_name in set(exclude):
                self.fields.pop(field_name, None)
        elif fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class PasswordSerializer:
    pass


class UserSerializer(GenericModelSerializer):
    bio = serializers.CharField(source="profile.bio")
    is_premium_member = serializers.CharField(source="profile.is_premium_member")
    has_support_contract = serializers.CharField(source="profile.has_support_contract")
    avatar = serializers.CharField(source="photo", read_only=True)
    full_name = serializers.CharField(source="get_full_name", read_only=True)

    class Meta(GenericModelSerializer.Meta):
        model = User
        extra_kwargs = {"password": {"write_only": True}}


class CategorySerializer(GenericModelSerializer):
    class Meta(GenericModelSerializer.Meta):
        model = Category


class TaggedObjectRelatedField(serializers.RelatedField):
    """
    A custom field to use for the `tagged_object` generic relationship.
    """

    # def to_representation(self, value):
    #     """
    #     Serialize tagged objects to a simple textual representation.
    #     """
    #     if isinstance(value, Bookmark):
    #         return 'Bookmark: ' + value.url
    #     elif isinstance(value, Note):
    #         return 'Note: ' + value.text
    #     raise Exception('Unexpected type of tagged object')


class CourseSerializer(GenericModelSerializer):
    teacher = UserSerializer(
        read_only=True, fields=("avatar", "full_name", "username", "email")
    )
    categories = CategorySerializer(many=True, read_only=True, fields=("slug", "name"))

    class Meta(GenericModelSerializer.Meta):
        model = Course
