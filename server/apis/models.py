from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify
from taggit.managers import TaggableManager

class Base(models.Model):
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Specifies whether this entity should be considered active."
            "Uncheck this instead of deleting the entity."
        ),
    )
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SlugMixin(models.Model):
    slug = models.SlugField(unique=True)

    class Meta:
        abstract = True
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Common(Base, SlugMixin):
    tags = TaggableManager()
    
    class Meta:
        abstract = True


class User(AbstractUser):
    email = models.EmailField(_("email address"), unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.get_full_name() or self.email or self.username


class Category(Base, SlugMixin):
    name = models.CharField(unique=True)

    def __str__(self):
        return self.name


class Course(Common):
    name = models.CharField(unique=True)

    def __str__(self):
        return self.name


class Interaction(Base):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    class Meta:
        abstract = True
        
        
class Comment(Interaction):
    content = models.TextField()
    
    def __str__(self):
        return self.content[:10]