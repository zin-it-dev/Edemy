from django.db import models 
from model_utils.models import TimeStampedModel, SoftDeletableModel
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify


class GenericModel(TimeStampedModel, SoftDeletableModel):
    """
    An abstract base class that provides common fields for other models.
    """

    class Meta: 
        abstract = True

        
class SlugifyModel(models.Model):
    """An abstract base class to be inherited by all models use slug field."""

    slug = models.SlugField(
        unique=True,
        verbose_name=_("URI"),
        help_text=_("A unique, URL-friendly string, usually derived from the name."),
    )

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)