from django.conf import settings
from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from model_utils.models import SoftDeletableModel, TimeStampedModel
from taggit.managers import TaggableManager


class GenericModel(TimeStampedModel, SoftDeletableModel):
    """An abstract base class that provides common fields for other models."""
    
    is_removed = models.BooleanField(
            default=False, 
            verbose_name=_("Active"),
            help_text=_("Designates whether this item is active or has been removed.")
        )

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


class TaggableModel(GenericModel, SlugifyModel):
    """A mixin to enable generic tagging across inheriting models."""

    tags = TaggableManager()

    class Meta:
        abstract = True


class InteractionModel(GenericModel):
    """A base model for user interactions with courses, such as comments or ratings."""

    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="%(app_label)s_%(class)s_related",
    )
    course = models.ForeignKey("Course", on_delete=models.CASCADE)

    class Meta:
        abstract = True