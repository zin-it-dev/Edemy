from cloudinary_storage.storage import MediaCloudinaryStorage
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from common.models import GenericModel, InteractionModel, SlugifyModel, TaggableModel


class User(AbstractUser):
    """Stores a single user entry :model:`app.User`."""


class Category(GenericModel, SlugifyModel):
    """Stores a single category entry :model:`app.Category`."""

    name = models.CharField(max_length=80, unique=True)
    
    class Meta:
        verbose_name_plural = _("Categories")
    
    def __str__(self) -> str:
        return self.name
    

class Course(TaggableModel):
    """Stores a single course entry :model:`app.Course`."""

    name = models.CharField(unique=True)
    description = models.TextField()
    price = models.DecimalField(default=0.00, max_digits=10, decimal_places=2)
    thumbnail = models.URLField(max_length=200, blank=True)
    image = models.ImageField(
        upload_to="courses/%y/%m/%d",
        null=True,
        blank=True,
        storage=MediaCloudinaryStorage(),
    )

    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.name


class Lesson(TaggableModel):
    """Stores a single lesson entry :model:`app.Lesson`."""

    name = models.CharField(unique=True)
    content = models.TextField()

    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    class Meta:
        unique_together = ["course", "name"]
    
    def __str__(self) -> str:
        return self.name


class Comment(InteractionModel):
    """Stores a single comment entry :model:`app.Comment`."""

    content = models.TextField()

    def __str__(self) -> str:
        return self.content[:10]