from django.db import models
from django.core.validators import MinValueValidator
from django.utils.translation import gettext_lazy as _
from libs.mixins.models import TimestampMixin, IsActiveMixin, SlugMixin


class Category(SlugMixin, TimestampMixin, IsActiveMixin):
    name = models.CharField(max_length=80)

    def __str__(self):
        return self.name


class Course(SlugMixin, TimestampMixin, IsActiveMixin):
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0.00,
        validators=[MinValueValidator(0)],
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="courses",
    )

    class Meta:
        verbose_name = _("course")
        verbose_name_plural = _("courses")
        indexes = [
            models.Index(fields=["category"]),
        ]

    def __str__(self):
        return self.title
