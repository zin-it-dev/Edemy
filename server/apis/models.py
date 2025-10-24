import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.text import slugify
from unidecode import unidecode
from django.contrib import admin
from django.utils.html import mark_safe
from django.utils.translation import gettext_lazy as _
from cloudinary_storage.storage import MediaCloudinaryStorage
from ckeditor_uploader.fields import RichTextUploadingField

from .utils import gravatar_url

class Model(models.Model):
    is_active = models.BooleanField(
        _("active"), 
        default=True,
        help_text=_(
            "Designates whether this item should be treated as active. "
            "Unselect this instead of deleting items."
        ),
    )
    created_on = models.DateTimeField(
        _("created on"),
        auto_now_add=True
    )
    changed_on = models.DateTimeField(
        _("changed on"),
        auto_now=True
    )
    
    class Meta:
        abstract = True
        
        
class Common(Model):
    slug = models.SlugField(
        max_length=255, 
        help_text=_("A short label, generally used in URLs.")
    )
    
    class Meta:
        abstract = True
        
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(unidecode(self.name))
        super().save(*args, **kwargs)
        
        
class User(AbstractUser):
    ROLE_CHOICES = (
        ('ADMIN', _('Admin')),
        ('USER', _('User'))
    )
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='USER')
    clerk_id = models.CharField(max_length=50, unique=True, null=True, blank=True)
    email = models.EmailField(unique=True)
    picture = models.URLField(max_length=200, blank=True, null=True, default=gravatar_url)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    @admin.display(description=_("Avatar"))
    def avatar(self):
        return mark_safe(
            f'<img src={self.picture} width="80" height="80" alt={self.username} class="img-thumbnail shadow" />'
        )
    
    def __str__(self):
        return self.get_full_name() or self.email or self.username 

        
class Category(Common):
    name = models.CharField(unique=True, max_length=80)
    
    class Meta:
        verbose_name_plural = _("Categories")
    
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
    thumbnail = models.URLField(max_length=200, blank=True)
    image = models.ImageField(upload_to='courses/%y/%m/%d', blank=True, storage=MediaCloudinaryStorage())
    
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    class Meta:
        verbose_name_plural = _("Courses")
    
    def __str__(self):
        return self.name
    
    
class Module(Model):
    name = models.CharField(max_length=255)
    
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='modules')
    
    class Meta:
        verbose_name_plural = _("Modules")
        unique_together = ['course', 'name']
    
    def __str__(self):
        return self.name 
        
        
class Lesson(Common):
    name = models.CharField(max_length=255)
    content = RichTextUploadingField()
    
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='lessons')

    class Meta:
        verbose_name_plural = _("Lessons")
        unique_together = ['module', 'name']
        
    def __str__(self):
        return f"{self.name} - {self.content[:20]}..."