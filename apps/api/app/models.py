from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from common.models import GenericModel, SlugifyModel


class User(AbstractUser):
    pass


class Category(GenericModel, SlugifyModel):
    name = models.CharField(max_length=80, unique=True)
    
    class Meta:
        verbose_name_plural = _("Categories")
    
    def __str__(self):
        return self.name
    

