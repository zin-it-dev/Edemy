from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from common.models import UUIdv7Model
from accounts.managers import UserManager


class User(UUIdv7Model, AbstractUser):
    clerk_id = models.CharField(
        max_length=255, unique=True, db_index=True, null=True, blank=True
    )
    email = models.EmailField(
        verbose_name=_("email address"), max_length=255, unique=True, db_index=True
    )
    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return "@%s" % self.username or self.get_full_name()
