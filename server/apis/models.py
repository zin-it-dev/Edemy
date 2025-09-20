import uuid

from django.contrib.auth.models import AbstractUser
from cloudinary_storage.storage import MediaCloudinaryStorage
from django.db import models
from django.contrib import admin
from django.utils.html import mark_safe
from ckeditor_uploader.fields import RichTextUploadingField

from .managers import UserManager
from .utils import gravatar_url

class User(AbstractUser):
    ROLE_CHOICES = (
        ('ADMIN', 'Admin'),
        ('USER', 'User')
    )
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='USER')
    email = models.EmailField(unique=True)
    picture = models.URLField(max_length=200, blank=True, null=True, default=gravatar_url)
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['username']
    
    objects = UserManager()
    
    def __str__(self):
        return self.get_full_name() or self.email
    
    def save(self, *args, **kwargs):
        if self.is_superuser:
            self.role = 'ADMIN'
        super().save(*args, **kwargs)

    @admin.display(description="Avatar")
    def avatar(self):
        return mark_safe(
            f'<img src={self.picture} width="80" height="80" alt={self.username} class="img-thumbnail shadow" />'
        )
    
    
class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    bio = models.TextField(blank=True)


class Common(models.Model):
    is_active = models.BooleanField(default=True, verbose_name="Active")
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True


class SlugModel(models.Model):
    slug = models.SlugField(default='', null=True, help_text="A short label, generally used in URLs.")

    class Meta:
        abstract = True


class Category(Common, SlugModel):
    name = models.CharField(unique=True, max_length=80)
    
    class Meta:
        verbose_name_plural = "Categories"
    
    def __str__(self):
        return self.name
    
    
class Course(Common, SlugModel):
    name = models.CharField(max_length=120)
    thumbnail = models.ImageField(upload_to='courses/%y/%m/%d', blank=True, storage=MediaCloudinaryStorage())
    description = models.TextField()
    
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name


class Lesson(Common, SlugModel):
    name = models.CharField(max_length=120)
    content = RichTextUploadingField()
    url = models.URLField()
    
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ['course', 'name']
    
    def __str__(self):
        return self.name


class Interact(Common):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    
    class Meta:
        abstract = True
    
    
class Comment(Interact):
    content = models.CharField(max_length=255)