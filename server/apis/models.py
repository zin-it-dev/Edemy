from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify
from cloudinary_storage.storage import MediaCloudinaryStorage
from django.contrib import admin
from django.utils.html import mark_safe

from .mixins import GenericModel, SlugifyModel, TaggifyModel
from .utils import generate_image


class User(AbstractUser):
    """
    Stores a single user entry :model:`apis.User`.
    """

    email = models.EmailField(_("email address"), unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.get_full_name() or self.email or self.username


class Category(GenericModel, SlugifyModel):
    """
    Stores a single category entry :model:`apis.Category`.
    """

    name = models.CharField(unique=True)

    class Meta:
        verbose_name_plural = _("Categories")

    def __str__(self):
        return self.name


class Course(TaggifyModel):
    """
    Stores a single course entry :model:`apis.Course`.
    """

    name = models.CharField(unique=True)
    description = models.TextField()
    price = models.DecimalField(default=0.00, max_digits=10, decimal_places=2)
    thumbnail = models.URLField(default=generate_image(size=120, default="monsterid"), max_length=200, blank=True)
    image = models.ImageField(
        upload_to="courses/%y/%m/%d",
        null=True,
        blank=True,
        storage=MediaCloudinaryStorage(),
    )

    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    @admin.display(description=_("Thumbnail"))
    def headshot_thumbnail(self):
        headshot = self.image.url if self.image else self.thumbnail
        return mark_safe(
            f'<img src={headshot} width="120" height="120" alt={self.name} class="img-thumbnail shadow" />'
        )

    @property
    def tags_indexing(self):
        """Tags for indexing.

        Used in Elasticsearch indexing.
        """
        return [tag.name for tag in self.tags.all()]


class Lesson(TaggifyModel):
    """
    Stores a single lesson entry :model:`apis.Lesson`.
    """

    name = models.CharField(unique=True)
    content = models.TextField()

    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    class Meta:
        unique_together = ["course", "name"]

    def __str__(self):
        return self.name


class Interaction(GenericModel):
    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="%(app_label)s_%(class)s_related",
    )
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    class Meta:
        abstract = True


class Comment(Interaction):
    """
    Stores a single comment entry :model:`apis.Comment`.
    """

    content = models.TextField()

    def __str__(self):
        return self.content[:10]
