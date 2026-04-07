from common.resources import GenericResource

from .models import Category


class CategoryResource(GenericResource):
    class Meta:
        model = Category
        import_order = ["name"]