import hashlib
from urllib.parse import urlencode
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from cloudinary_storage.storage import MediaCloudinaryStorage
from django.contrib import admin
from django.utils.html import mark_safe


def _gravatar_url(
    email: str = "edemy@gmail.com", default: str = "identicon", size: int = 80
) -> str:
    email_encoded = email.strip().lower().encode("utf-8")
    email_hash = hashlib.sha256(email_encoded).hexdigest()
    params = urlencode({"d": default, "s": str(size)})
    return f"https://www.gravatar.com/avatar/{email_hash}?{params}"


class User(AbstractUser):
    """Application user synchronized with Clerk identity records."""

    class Role(models.TextChoices):
        ADMIN = "ADMIN", _("Admin")
        EDUCATOR = "EDUCATOR", _("Educator")
        USER = "USER", _("User")

    class Tier(models.TextChoices):
        FREE = "FREE", _("Free")
        PREMIUM = "PREMIUM", _("Premium")
        PRO = "PRO", _("Pro")
        ENTERPRISE = "ENTERPRISE", _("Enterprise")

    clerk_id = models.CharField(max_length=255, unique=True)
    email = models.EmailField(_("email address"), unique=True)
    picture = models.ImageField(
        upload_to="avatars/%y/%m/%d",
        blank=True,
        default=_gravatar_url,
        storage=MediaCloudinaryStorage(),
    )
    role = models.CharField(
        _("role"), max_length=20, choices=Role.choices, default=Role.USER
    )
    tier = models.CharField(
        _("tier"), max_length=20, choices=Tier.choices, default=Tier.FREE
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
        ordering = ["-date_joined"]
        indexes = [
            models.Index(fields=["clerk_id"]),
            models.Index(fields=["email"]),
        ]

    @property
    def is_admin(self) -> bool:
        return self.role == self.Role.ADMIN and self.is_superuser

    @property
    def is_educator(self) -> bool:
        return self.role == self.Role.EDUCATOR and self.is_staff

    @admin.display(description=_("Avatar"))
    def avatar(self):
        return mark_safe(
            f'<img src={self.picture} width="80" height="80" alt={self.email} class="img-thumbnail shadow" />'
        )

    def __str__(self):
        return self.email
