from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(unique=True)
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.get_full_name() or self.email or self.username
    
    
class Category(models.Model):
    name = models.CharField(unique=True)
    
    def __str__(self):
        return self.name