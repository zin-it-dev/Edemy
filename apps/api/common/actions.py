from django.core import serializers
from django.http import HttpResponse


def export_as_json(self, request, queryset):
    """Action to export selected objects as JSON."""
    response = HttpResponse(content_type="application/json")
    serializers.serialize("json", queryset, stream=response)
    return response