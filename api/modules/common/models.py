import uuid

from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _

from .managers import ActivatorManager


class TimeStampedModelMixin(models.Model):
    date_created = models.DateTimeField(_("date created"), auto_now_add=True)
    date_modified = models.DateTimeField(_("date modified"), auto_now=True)

    class Meta:
        abstract = True
        ordering = ["-date_created"]


class ActivatorModelMixin(models.Model):
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Uncheck this box to deactivate the record instead of deleting it."
        ),
    )

    objects = models.Manager()
    entities = ActivatorManager()

    class Meta:
        abstract = True

    def soft_delete(self):
        self.is_active = False
        self.save()


class UUIDFieldModelMixin(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    class Meta:
        abstract = True


class SlugFieldModelMixin(models.Model):
    slug = models.SlugField(
        _("URL-friendly"),
        unique=True,
        help_text=_("A unique identifier used for the URL of this record."),
    )

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        update_fields = kwargs.get("update_fields")
        updated = update_fields is not None and "name" in update_fields

        if not self.slug or updated:
            self.slug = slugify(self.name)
            if updated:
                kwargs["update_fields"] = list({"slug"}.union(update_fields))
        super().save(*args, **kwargs)


class AbstractInfo(SlugFieldModelMixin, TimeStampedModelMixin, ActivatorModelMixin):
    class Meta(TimeStampedModelMixin.Meta):
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


class AbstractItem(AbstractInfo):
    """
    Abstract model for generic content types.
    """

    tags = GenericRelation("Tag")

    class Meta(AbstractInfo.Meta):
        abstract = True


class AbstractInteraction(
    TimeStampedModelMixin, ActivatorModelMixin, GenericContentType
):
    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name=_("creator"),
        on_delete=models.CASCADE,
        limit_choices_to=models.Q(role="USER"),
        related_name="%(app_label)s_%(class)s_created",
        related_query_name="%(app_label)s_%(class)ss",
    )

    class Meta(TimeStampedModelMixin.Meta):
        abstract = True


# class AbstractPayment(ActivatorModelMixin, TimeStampedModelMixin):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     course = models.ForeignKey(Course, on_delete=models.CASCADE)

#     class Meta(AbstractInfo.Meta):
#         abstract = True
