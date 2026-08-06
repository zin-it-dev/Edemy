from django.db import models
from django.core.exceptions import ObjectDoesNotExist


class GenericRepository:
    def __init__(self, model: models.Model):
        self.model = model

    def get_all(self):
        return self.model.objects.all()

    def get_by_id(self, obj_id):
        try:
            return self.model.objects.get(id=obj_id)
        except ObjectDoesNotExist:
            return None

    def create(self, **kwargs):
        return self.model.objects.create(**kwargs)

    def update(self, obj_id, **kwargs):
        obj = self.get_by_id(obj_id)
        if obj:
            for key, value in kwargs.items():
                setattr(obj, key, value)
            obj.save()
            return obj
        return None

    def delete(self, obj_id):
        obj = self.get_by_id(obj_id)
        if obj:
            obj.delete()
            return True
        return False
