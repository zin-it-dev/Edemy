from django.contrib.auth.models import UserManager as BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    def create_user(
        self,
        username,
        email,
        password,
        **extra_fields,
    ):
        """
        Creates and saves a User and Profile.
        """
        fields = {"bio", "is_premium_member", "has_support_contract"}
        profile_fields = {k: extra_fields.pop(k) for k in fields if k in extra_fields}
        user = self.model(
            username=username, email=self.normalize_email(email), **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)

        if profile_fields:
            profile = user.profile
            for key, value in profile_fields.items():
                setattr(profile, key, value)
            profile.save()
        return user

    def create_superuser(self, username, email, password, **extra_fields):
        """
        Creates and saves a superuser with the given email, username, role Admin and password.
        """
        extra_fields.setdefault("role", "ADMIN")
        if extra_fields.get("role") != "ADMIN":
            raise ValueError(_("Superuser must have role is ADMIN."))
        return super().create_superuser(username, email, password, **extra_fields)


class TeacherManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(role="TEACHER")


class StudentManager(models.Manager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(role="USER")