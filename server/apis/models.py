from django.db import models
from django.utils.text import slugify


class Model(models.Model):
    is_active = models.BooleanField(default=True)
    created_on = models.DateTimeField(auto_now_add=True)
    changed_on = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True
        
        
class Common(Model):
    url = models.SlugField(unique=True, null=True, help_text="A short label, generally used in URLs.")
    
    class Meta:
        abstract = True
        
    def save(self, *args, **kwargs):
        if not self.url:
            self.url = slugify(self.name)
        super().save(*args, **kwargs)
        
        
class Category(Common):
    name = models.CharField(unique=True, max_length=80)
    
    def __str__(self):
        return self.name