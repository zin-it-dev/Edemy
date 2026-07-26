import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _
from model_utils.models import SoftDeletableModel, TimeStampedModel
from model_utils.managers import SoftDeletableManager
from django_extensions.db.models import TitleSlugDescriptionModel
from django_extensions.db.fields import AutoSlugField
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType


class GenericModel(SoftDeletableModel, TimeStampedModel):
    id = models.UUIDField(_("id"), primary_key=True, default=uuid.uuid7, editable=False)

    objects = SoftDeletableManager()

    class Meta:
        abstract = True


class CommonInfo(TitleSlugDescriptionModel, GenericModel):
    class Meta:
        abstract = True

    def slugify_function(self, content):
        return content.replace("_", "-").lower()


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


class Tag(GenericModel):
    slug = AutoSlugField(populate_from="title")
    title = models.CharField(max_length=80, unique=True)

    def slugify_function(self, content):
        return content.replace("_", "-").lower()

    def __str__(self):
        return "#{}".format(self.title)


class CommonContent(CommonInfo):
    tags = GenericRelation(Tag)
    thumbnail = models.ImageField(upload_to="resources/%Y/%m/%d")

    class Meta:
        abstract = True
        ordering = ["-created"]
