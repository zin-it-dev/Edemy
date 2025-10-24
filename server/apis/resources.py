from import_export import resources

from .models import Category


class ModelResource(resources.ModelResource):
    class Meta:
        export_order = '__all__'
        
        
class CategoryResource(ModelResource):
    class Meta:
        model = Category