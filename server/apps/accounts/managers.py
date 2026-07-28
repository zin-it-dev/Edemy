import re
import string

from django.contrib.auth.models import UserManager as AbstractUserManager
from django.utils.crypto import get_random_string


class UserManager(AbstractUserManager):
    def _random_username(self, email, length=6):
        prefix = re.sub(r"[^a-zA-Z0-9]", "", email.split("@")[0]).lower()[:12]
        allowed_chars = string.ascii_lowercase + string.digits
        random_suffix = get_random_string(length=length, allowed_chars=allowed_chars)
        return f"{prefix}_{random_suffix}"

    def create_user(self, email, password=None, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            username=self._create_username(email),
            **extra_fields,
        )

        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        user = self.create_user(email, password, **extra_fields)
        user.save(using=self._db)
        return user
