from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator

from core.models import GenericModel, GenericContentType, CommonInfo


class Tag(GenericContentType, GenericModel):
    """
    Tags arbitrary model instances using a generic relation.

    See: https://docs.djangoproject.com/en/stable/ref/contrib/contenttypes/
    """

    class Meta(GenericModel.Meta):
        verbose_name = _("tag")
        verbose_name_plural = _("tags")


class Category(GenericModel):
    """Stores a single category entry, related to :model:`app.Category`."""

    class Meta(GenericModel.Meta):
        verbose_name = _("category")
        verbose_name_plural = _("categories")


class Course(CommonInfo):
    categories = models.ManyToManyField(
        Category,
        verbose_name=_("list of categories"),
        related_name="courses",
        blank=True,
    )
    price = models.DecimalField(
        _("price"), max_digits=10, decimal_places=2, default=0.00
    )
    discount = models.PositiveIntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(100)]
    )

    class Meta(CommonInfo.Meta):
        verbose_name = _("course")
        verbose_name_plural = _("courses")

    @property
    def promotional_price(self):
        return self.price - (self.price * self.discount / 100)


class Lesson(CommonInfo):
    """
    Stores a single lesson entry, related to :model:`app.Lesson` and
    :model:`app.Course`.
    """

    course = models.ForeignKey(
        Course,
        verbose_name=_("course"),
        on_delete=models.CASCADE,
        related_name="lessons",
        related_query_name="lesson",
    )
    title = models.CharField(_("title"), max_length=125)
    video_url = models.URLField(_("video"), blank=True)
    content = models.TextField(_("content"))

    class Meta(CommonInfo.Meta):
        verbose_name = _("lesson")
        verbose_name_plural = _("lessons")
        constraints = [
            models.UniqueConstraint(
                fields=["title", "course"], name="unique_title_course"
            )
        ]
