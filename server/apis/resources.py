from import_export import resources

from .models import Category


class GenericResource(resources.ModelResource):
    class Meta:
        export_order = '__all__'
        widgets = {
            'date_created': {'format': '%d/%m/%Y'},
        }
        

class CategoryResource(GenericResource):
    class Meta:
        model = Category
        import_order = ['name']