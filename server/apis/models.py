import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.text import slugify
from unidecode import unidecode
from django.contrib import admin
from django.utils.html import mark_safe

from .utils import gravatar_url

class Model(models.Model):
    is_active = models.BooleanField(default=True)
    created_on = models.DateTimeField(auto_now_add=True)
    changed_on = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True
        
        
class Common(Model):
    slug = models.SlugField(max_length=255, help_text="A short label, generally used in URLs.")
    
    class Meta:
        abstract = True
        
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(unidecode(self.name))
        super().save(*args, **kwargs)
        
        
class User(AbstractUser):
    ROLE_CHOICES = (
        ('ADMIN', 'Admin'),
        ('USER', 'User')
    )
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='USER')
    clerk_id = models.CharField(max_length=50, unique=True, null=True, blank=True)
    email = models.EmailField(unique=True)
    picture = models.URLField(max_length=200, blank=True, null=True, default=gravatar_url)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    @admin.display(description="Avatar")
    def avatar(self):
        return mark_safe(
            f'<img src={self.picture} width="80" height="80" alt={self.username} class="img-thumbnail shadow" />'
        )
    
    def __str__(self):
        return self.get_full_name() or self.email or self.username 

        
class Category(Common):
    name = models.CharField(unique=True, max_length=80)
    
    def __str__(self):
        return self.name

class Course(Common):
    class Level(models.TextChoices):
        BEGINNER = 'BEGINNER', 'Beginner',
        INTERMEDIATE = 'INTERMEDIATE', 'Intermediate',
        ADVANCED = 'ADVANCED', 'Advanced'
        
    name = models.CharField(max_length=255)
    description = models.TextField()
    level = models.CharField(max_length=20, choices=Level.choices, default=Level.BEGINNER)
    # thumbnail = models.URLField(max_length=200, blank=True, null=True)
    # image = models.ImageField(upload_to='courses/%y/%m/%d', blank=True, null=True)
    
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name
    
    
class Module(Model):
    name = models.CharField(max_length=255)
    
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='modules')
    
    class Meta:
        unique_together = ['course', 'name']
        
        
class Lesson(Common):
    name = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='lessons')

    class Meta:
        unique_together = ['module', 'name']