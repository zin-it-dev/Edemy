from django.db.models import Model
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction


class GenericRepository:
    """
    Repository pattern provide generic CRUD operations that can be reused across different models.
    """

    def __init__(self, model: Model):
        self.model = model

    def get_all(self):
        return self.model.objects.filter(is_removed=False).all()

    def get_by_props(self, **kwargs):
        try:
            return self.model.objects.get(**kwargs)
        except ObjectDoesNotExist:
            return None

    @transaction.atomic
    def create(self, **kwargs):
        return self.model.objects.create(**kwargs)

    @transaction.atomic
    def update(self, lookup: dict, **kwargs):
        obj = self.get_by_props(lookup)
        if obj:
            for key, value in kwargs.items():
                setattr(obj, key, value)
            obj.save()
            return obj
        return None

    @transaction.atomic
    def delete(self, **kwargs):
        obj = self.get_by_props(**kwargs)
        if obj:
            obj.delete()
            return True
        return False
