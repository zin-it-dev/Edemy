from rest_framework import serializers


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` or `exclude` argument that
    controls which fields should be displayed.
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
