from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """Application user synchronized with Clerk identity records."""

    class Roles(models.TextChoices):
        ADMIN = "ADMIN", _("Administrator")
        EDUCATOR = "EDUCATOR", _("Educator")
        USER = "USER", _("User")

    clerk_id = models.CharField(
        max_length=255,
        unique=True,
        null=True,
        blank=True,
        db_index=True,
    )
    email = models.EmailField(_("email address"), unique=True)
    role = models.CharField(
        max_length=20,
        choices=Roles.choices,
        default=Roles.USER,
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    class Meta:
        ordering = ["-date_joined"]
        verbose_name = _("user")
        verbose_name_plural = _("users")

    @property
    def is_educator(self) -> bool:
        return self.is_active and self.role == self.Roles.EDUCATOR

    @property
    def is_student(self) -> bool:
        return self.is_active and self.role == self.Roles.USER

    @property
    def is_app_admin(self) -> bool:
        return self.is_active and (self.is_superuser or self.role == self.Roles.ADMIN)

    def save(self, *args, **kwargs):
        if self.email:
            self.email = self.email.strip().casefold()
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.email


class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile",
    )
    bio = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"Profile for {self.user.email}"


class AdminRequiredMixin:
    """Mixin to require admin role."""

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not request.user.is_app_admin:
            from django.core.exceptions import PermissionDenied

            raise PermissionDenied
        return super().dispatch(request, *args, **kwargs)
