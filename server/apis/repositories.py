from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404

from .models import User, Category, Course, Lesson

class BaseRepository:
    def __init__(self, model: models.Model):
        self.model = model

    def get_all(self):
        return self.model.objects.filter(is_active=True).all()

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
    
    
class UserRepository(BaseRepository):
    def __init__(self):
        super().__init__(User)
        
    def get_all(self):
        return self.model.objects.all()
    
    
class CategoryRepository(BaseRepository):
    def __init__(self):
        super().__init__(Category)
        
        
class CourseRepository(BaseRepository):
    def __init__(self):
        super().__init__(Course)
        
    def get_all(self):
        return self.model.objects.filter(is_active=True).all().order_by('-date_created')


class LessonRepository(BaseRepository):
    def __init__(self):
        super().__init__(Lesson)
        
    def get_all(self, course=None):
        return self.model.objects.filter(course__slug=course)
    
    def get_by_slug(self, slug=None, course=None):
        queryset = self.model.objects.filter(slug=slug, course__slug=course)
        return get_object_or_404(queryset, slug=slug)