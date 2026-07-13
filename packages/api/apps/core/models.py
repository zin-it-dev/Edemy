from django.db import models
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType

from .mixins import NamedMixin, SoftDeleteMixin, TimestampMixin


class GenericModel(TimestampMixin, SoftDeleteMixin, NamedMixin):
    class Meta:
        abstract = True
        ordering = ["-date_created"]

    def __str__(self):
        return self.title


class CommonInfo(GenericModel):
    thumbnail = models.ImageField(upload_to="resources/%Y/%m/%d")
    description = models.TextField(_("description"), null=True, blank=True)
    tags = GenericRelation("Tag")

    class Meta(GenericModel.Meta):
        abstract = True


class GenericContentType(models.Model):
    """
    Model instances using a generic relation.

    See: https://docs.djangoproject.com/en/stable/ref/contrib/contenttypes/
    """

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveBigIntegerField()
    content_object = GenericForeignKey("content_type", "object_id")

    class Meta:
        abstract = True
        indexes = [
            models.Index(fields=["content_type", "object_id"]),
        ]
