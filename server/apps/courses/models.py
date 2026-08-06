from django.db import models
from django.utils.translation import gettext_lazy as _


class Category(models.Model):
    name = models.CharField(_("name"), unique=True, max_length=50)

    def __str__(self):
        return self.name
