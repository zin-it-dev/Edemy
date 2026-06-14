from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _

from .managers import ActiveManager


class AuditMixin(models.Model):
    date_created = models.DateTimeField(_("date created"), auto_now_add=True)
    date_changed = models.DateTimeField(_("date changed"), auto_now=True)

    class Meta:
        abstract = True
        ordering = ["date_created"]


class SoftDeleteMixin(models.Model):
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Uncheck this box to deactivate the record instead of deleting it."
        ),
    )

    everything = models.Manager()
    objects = ActiveManager()

    class Meta:
        abstract = True

    def soft_deleted(self):
        self.is_active = False
        self.save()


class SluggedMixin(models.Model):
    """
    Abstract model that handles auto-generating slugs.
    """

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


class Base(AuditMixin):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveBigIntegerField()
    content_object = GenericForeignKey("content_type", "object_id")

    class Meta(AuditMixin.Meta):
        indexes = [
            models.Index(fields=["content_type", "object_id"]),
        ]
        abstract = True


class Tag(SoftDeleteMixin, Base):
    """
    Tags arbitrary model instances using a generic relation.

    See: https://docs.djangoproject.com/en/stable/ref/contrib/contenttypes/
    """

    name = models.CharField(_("name"), max_length=80, unique=True)

    def __str__(self):
        return self.name


class Generic(AuditMixin, SoftDeleteMixin, SluggedMixin):
    """
    Abstract model for generic content types.
    """

    tags = GenericRelation(
        Tag,
        content_type_field="content_type",
        object_id_field="object_id",
    )

    class Meta:
        abstract = True


class Review(Base):
    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name=_("creator"),
        on_delete=models.CASCADE,
        limit_choices_to=models.Q(role="USER"),
        related_name="%(app_label)s_%(class)s_created",
        related_query_name="%(app_label)s_%(class)ss",
    )

    class Meta(Base.Meta):
        abstract = True


class Interaction(AuditMixin, SoftDeleteMixin):
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name=_("student"),
        on_delete=models.CASCADE,
        limit_choices_to=models.Q(role="USER"),
    )
    course = models.ForeignKey(
        "Course", verbose_name=_("course"), on_delete=models.CASCADE
    )

    class Meta:
        abstract = True
        constraints = [
            models.UniqueConstraint(
                fields=["student", "course"],
                name="%(app_label)s_%(class)s_unique_student_course",
            )
        ]
