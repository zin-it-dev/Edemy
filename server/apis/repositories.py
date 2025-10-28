from django.db import models

from .models import Category, Course


class BaseRepository:
    def __init__(self, model: models.Model):
        self.model = model

    def get_all(self):
        return self.model.objects.filter(is_active=True).all()

    def get_by_slug(self, obj_slug):
        try:
            return self.model.objects.get(slug=obj_slug)
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
    

class UserRepository(BaseRepository): 
    def __init__(self):
        super().__init__(User)

    def get_by_clerk_id(self, clerk_id):
        return self.model.objects.get(clerk_id=clerk_id, is_active=True)
    
    def create_or_update_user(self, **kwargs):
        clerk_id = kwargs.get('clerk_id')
        defaults = {k: v for k, v in kwargs.items() if k != 'clerk_id'}
        user, created = self.model.objects.update_or_create(
            clerk_id=clerk_id,
            defaults=defaults
        )
        return user
    
    def delete_by_clerk_id(self, clerk_id):
        return self.model.objects.filter(clerk_id=clerk_id).update(is_active=False)
    
 
class CategoryRepository(BaseRepository):
    def __init__(self):
        super().__init__(Category)
        

class CourseRepository(BaseRepository):
    def __init__(self):
        super().__init__(Course)
        
    def get_all(self):
        return self.model.objects.filter(is_active=True, user__is_staff=True).all()
    
    def get_my_courses(self, user):
        return self.model.objects.filter(user=user).all()