from common.models import (
    AbstractInfo,
    AbstractItem,
    ActivatorModelMixin,
    GenericContentType,
    TimeStampedModelMixin,
)
from django.contrib import admin
from django.db import models
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator


class Tag(GenericContentType, AbstractInfo):
    """
    Tags arbitrary model instances using a generic relation.

    See: https://docs.djangoproject.com/en/stable/ref/contrib/contenttypes/
    """

    name = models.CharField(_("name"), max_length=80, unique=True)

    def __str__(self):
        return self.name


class Category(AbstractInfo):
    """Stores a single category entry, related to :model:`app.Category`."""

    name = models.CharField(_("name"), max_length=80, unique=True)

    class Meta(AbstractInfo.Meta):
        verbose_name = _("category")
        verbose_name_plural = _("categories")

    def __str__(self):
        return self.name


class Course(AbstractItem):
    """
    Stores a single course entry, related to :model:`app.Course` :model:`app.Category` and
    :model:`app.User`.
    """
    class Difficulty(models.TextChoices):
        EASY = 'E', 'Easy'
        MODERATE = 'M', 'Moderate'
        HARD = 'H', 'Hard'

    name = models.CharField(_("name"), max_length=120)
    price = models.DecimalField(
        _("price"), max_digits=10, decimal_places=2, default=0.00
    )
    discount = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    thumbnail = models.ImageField(upload_to="courses/%Y/%m/%d")
    description = models.TextField(_("description"), null=True, blank=True)
    difficulty_level = models.CharField(
        max_length=1,
        choices=Difficulty.choices,
        default=Difficulty.EASY,
    )
    categories = models.ManyToManyField(
        Category,
        verbose_name=_("list of categories"),
        related_name="courses",
        blank=True,
    )

    class Meta(AbstractItem.Meta):
        verbose_name = _("course")
        verbose_name_plural = _("courses")
        
    @property
    def promotional_price(self):
        return self.price - (self.price * self.discount / 100)

    @admin.display(description="Photo")
    def photo(self):
        return format_html(
            '<img src={} width="80" height="80" alt={} class="img-thumbnail shadow" />',
            self.thumbnail,
            self.name,
        )

    def __str__(self):
        return self.name


class Lesson(AbstractItem):
    """
    Stores a single lesson entry, related to :model:`app.Lesson` and
    :model:`app.Course`.
    """

    name = models.CharField(_("name"), max_length=120)
    video_url = models.URLField(_("video"), blank=True)
    content = models.TextField(_("content"))
    course = models.ForeignKey(
        Course,
        verbose_name=_("course"),
        on_delete=models.CASCADE,
        related_name="lessons",
        related_query_name="lesson",
    )

    class Meta(AbstractItem.Meta):
        verbose_name = _("lesson")
        verbose_name_plural = _("lessons")
        constraints = [
            models.UniqueConstraint(
                fields=["name", "course"], name="unique_name_course"
            )
        ]

    def __str__(self):
        return self.name


class Resource(TimeStampedModelMixin, ActivatorModelMixin):
    """
    Stores a single resource entry, related to :model:`app.Resource` and
    :model:`app.Lesson`.
    """

    file = models.URLField(_("file"))
    lesson = models.ForeignKey(
        Lesson,
        verbose_name=_("lesson"),
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="resources",
        related_query_name="resource",
    )

    class Meta(TimeStampedModelMixin.Meta):
        verbose_name = _("resource")
        verbose_name_plural = _("resources")
