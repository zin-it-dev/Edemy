from cloudinary_storage.storage import MediaCloudinaryStorage
from common.fields import HybridImageField
from common.models import TimeStampedModelMixin
from django.contrib import admin
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _

from .managers import StudentManager, TeacherManager, UserManager


class Roles(models.TextChoices):
    ADMIN = "ADMIN", _("Admin")
    USER = "USER", _("User")
    TEACHER = "TEACHER", _("Teacher")


class User(AbstractUser):
    """Stores a single user entry :model:`app.User`."""

    clerk_id = models.CharField(max_length=255, unique=True, null=True, blank=True)
    email = models.EmailField(_("email address"), max_length=255, unique=True)
    picture = HybridImageField(
        _("picture"),
        upload_to="avatars/%Y/%m/%d",
        storage=MediaCloudinaryStorage(),
        null=True,
        blank=True,
        max_length=255,
    )
    role = models.CharField(_("role"), max_length=8, choices=Roles, default=Roles.USER)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
        ordering = ["date_joined"]

    @property
    def photo(self):
        if self.picture and hasattr(self.picture, "url"):
            return self.picture.url

        import hashlib
        from urllib.parse import urlencode

        digest = hashlib.sha256(self.email.lower().encode("utf-8")).hexdigest()
        params = urlencode({"d": "wavatar", "s": 80, "r": "g"})
        return f"https://www.gravatar.com/avatar/{digest}?{params}"

    @admin.display(description="Avatar")
    def avatar(self):
        return format_html(
            '<img src={} width="80" height="80" alt={} class="img-thumbnail shadow" />',
            self.photo,
            self.email,
        )

    def __str__(self):
        return self.get_full_name() or self.email


class Profile(TimeStampedModelMixin):
    """
    Stores a single profile entry, related to :model:`app.Profile` and
    :model:`app.User`.
    """

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True, related_name="profile"
    )
    is_premium_member = models.BooleanField(_("premium member"), default=False)
    has_support_contract = models.BooleanField(_("support contract"), default=False)
    bio = models.TextField(null=True, blank=True)
    credits = models.IntegerField(
        default=5
    )

    class Meta:
        verbose_name = _("profile")
        verbose_name_plural = _("profiles")

    def __str__(self):
        return f"Profile of {self.user}"


class Teacher(User):
    class Meta:
        proxy = True
        verbose_name = _("teacher")
        verbose_name_plural = _("teachers")

    objects = TeacherManager()

    def save(self, *args, **kwargs):
        self.role = Roles.TEACHER
        self.is_staff = True
        return super().save(*args, **kwargs)


class Student(User):
    class Meta:
        proxy = True
        verbose_name = _("student")
        verbose_name_plural = _("students")

    objects = StudentManager()
