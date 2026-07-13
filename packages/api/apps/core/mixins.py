from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify

from .managers import SoftDeleteManager


class TimestampMixin(models.Model):
    date_created = models.DateTimeField(_("date created"), auto_now_add=True)
    date_modified = models.DateTimeField(_("date modified"), auto_now=True)

    class Meta:
        abstract = True


class NamedMixin(models.Model):
    slug = models.SlugField(
        _("URL-friendly"),
        unique=True,
        help_text=_("A unique identifier used for the URL of this record."),
    )
    title = models.CharField(_("title"), max_length=125, unique=True)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        update_fields = kwargs.get("update_fields")
        updated = update_fields is not None and "name" in update_fields

        if not self.slug or updated:
            self.slug = slugify(self.title)
            if updated:
                kwargs["update_fields"] = list({"slug"}.union(update_fields))
        super().save(*args, **kwargs)


class SoftDeleteMixin(models.Model):
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Uncheck this box to deactivate the record instead of deleting it."
        ),
    )

    objects = SoftDeleteManager()
    entities = models.Manager()

    class Meta:
        abstract = True

    def delete(self):
        self.is_active = False
        self.save()
