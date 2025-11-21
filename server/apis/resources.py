from import_export import resources

from .models import Category


class BaseModelResource(resources.ModelResource):
    class Meta:
        export_order = '__all__'
        widgets = {
            'date_created': {'format': '%d/%m/%Y'},
        }
        

class CategoryResource(BaseModelResource):
    class Meta:
        model = Category
        import_order = ['name']