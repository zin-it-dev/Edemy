from import_export import resources


class GenericResource(resources.ModelResource):
    """A generic resource class for import/export operations.
    This class can be extended by specific model resources to inherit common configurations and behaviors for data import and export.
    """

    class Meta:
        export_order = "__all__"
        widgets = {
            "created": {"format": "%d/%m/%Y"},
        }