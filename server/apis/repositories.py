from django.db import models
from django.core.exceptions import ObjectDoesNotExist

from .models import Category


class BaseRepository:
    def __init__(self, model: models.Model):
        self.model = model

    def get_all(self):
        return self.model.objects.filter(is_active=True).all()

    def get_by_slug(self, obj_slug):
        try:
            return self.model.objects.get(url=obj_slug)
        except ObjectDoesNotExist:
            return None

    def create(self, **kwargs):
        return self.model.objects.create(**kwargs)

    def update(self, obj_slug, **kwargs):
        obj = self.get_by_slug(obj_slug)
        if obj:
            for key, value in kwargs.items():
                setattr(obj, key, value)
            obj.save()
            return obj
        return None

    def delete(self, obj_slug):
        obj = self.get_by_slug(obj_slug)
        if obj:
            obj.delete()
            return True
        return False
    
    
class CategoryRepository(BaseRepository):
    def __init__(self):
        super().__init__(Category)