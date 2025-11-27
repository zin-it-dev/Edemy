from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify

from .mixins import GenericMixin, SlugifyMixin


class Tag(GenericMixin):
    """
    Stores a single tag entry :model:`apis.Tag`.
    """

    name = models.CharField(unique=True, max_length=50)

    def __str__(self):
        return self.name


class Common(GenericMixin, SlugifyMixin):
    tags = models.ManyToManyField(
        Tag,
        blank=True,
        related_name="%(app_label)s_%(class)s_related",
        related_query_name="%(app_label)s_%(class)ss",
    )

    class Meta:
        abstract = True


class User(AbstractUser):
    """
    Stores a single user entry :model:`apis.User`.
    """

    email = models.EmailField(_("email address"), unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.get_full_name() or self.email or self.username


class Category(GenericMixin, SlugifyMixin):
    """
    Stores a single category entry :model:`apis.Category`.
    """

    name = models.CharField(unique=True)

    class Meta:
        verbose_name_plural = _("Categories")

    def __str__(self):
        return self.name


class Course(Common):
    """
    Stores a single course entry :model:`apis.Course`.
    """

    name = models.CharField(unique=True)
    description = models.TextField()
    price = models.DecimalField(default=0.00, max_digits=10, decimal_places=2)

    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    creator = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name="%(app_label)s_%(class)s_related",
    )

    def __str__(self):
        return self.name

    def prepare_tags(self):
        return [tag.name for tag in self.tags.all()]


class Interaction(GenericMixin):
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
