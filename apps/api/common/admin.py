from django.contrib import admin
from django_pdf_actions.actions import export_to_pdf_landscape, export_to_pdf_portrait

from .actions import export_as_json


class GenericAdministrator(admin.ModelAdmin):
    """Generic admin class that can be extended for different models."""
    
    empty_value_display = "-Unknown-"

    actions = [export_as_json, export_to_pdf_landscape, export_to_pdf_portrait]
    readonly_fields = ["created", "modified"]

    list_display = ["is_removed", "created", "modified"]
    list_filter = ["is_removed"]
    list_editable = ["is_removed"]