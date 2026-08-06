# def generate_groups(apps, schema_editor):
#     Group = apps.get_model("auth", "Group")
#     Permission = apps.get_model("auth", "Permission")
#     ContentType = apps.get_model("contenttypes", "ContentType")
#     User = apps.get_model("accounts", "User")
#     groups = ["Student", "Educator", "Admin"]

#     for group in groups:
#         Group.objects.get_or_create(name=group)

#     user_ct = ContentType.objects.get_for_model(User)
#     perm, _ = Permission.objects.get_or_create(
#         codename="can_go_haridwar", name="Can go to Haridwar", content_type=user_ct
#     )


# def rollback_groups(apps, schema_editor):
#     Group = apps.get_model("auth", "Group")
#     Group.objects.filter(name__in=["Student", "Instructor", "Admin"]).delete()


# class Migration(migrations.Migration):
#     dependencies = [
#         ("accounts", "0001_initial"),
#     ]

#     operations = [migrations.RunPython(generate_groups, reverse_code=rollback_groups)]

import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _
from common.managers import ActiveManager


class UUIdv7Model(models.Model):
    id = models.UUIDField(default=uuid.uuid7, primary_key=True, editable=False)

    class Meta:
        abstract = True


class GenericModel(UUIdv7Model):
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
        db_index=True,
    )
    date_created = models.DateField(_("date created"), auto_now_add=True, db_index=True)
    date_updated = models.DateField(_("date updated"), auto_now=True, db_index=True)

    objects = ActiveManager()
    all_objects = models.Manager()

    class Meta:
        abstract = True
        ordering = ["-date_created"]
