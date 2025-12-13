import enum

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify
from cloudinary_storage.storage import MediaCloudinaryStorage
from django.contrib import admin
from django.utils.html import mark_safe
from ckeditor_uploader.fields import RichTextUploadingField

from .mixins import GenericModel, SlugifyModel, TaggifyModel
from .utils import decode_avatar
from .managers import UserManager


class ClerkWebhookEvent(enum.Enum):
    USER_CREATED = "user.created"
    USER_DELETED = "user.deleted"
    USER_UPDATED = "user.updated"


class User(AbstractUser):
    """
    Stores a single user entry :model:`apis.User`.
    """

    ROLE_CHOICES = (("ADMIN", "Admin"), ("USER", "User"))

    clerk_id = models.CharField(max_length=50, unique=True, null=True, blank=True)
    email = models.EmailField(_("email address"), unique=True)
    picture = models.URLField(
        default=decode_avatar,
        max_length=200,
        blank=True,
        null=True,
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="USER")

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.get_full_name() or self.email or self.username

    @admin.display(description="Avatar")
    def avatar(self):
        return mark_safe(
            f'<img src={self.picture} width="80" height="80" alt={self.username} class="img-thumbnail shadow" />'
        )

    @classmethod
    def handle_clerk_webhook(cls, event):
        data = event["data"]
        clerk_id = data["id"]

        if event["type"] in [
            ClerkWebhookEvent.USER_CREATED.value,
            ClerkWebhookEvent.USER_UPDATED.value,
        ]:
            primary_email = next(
                (
                    email.get("email_address")
                    for email in data.get("email_addresses", [])
                    if email.get("id") == data.get("primary_email_address_id")
                ),
                None,
            )

            user, _ = cls.objects.get_or_create(
                clerk_id=clerk_id,
                defaults={
                    "email": primary_email,
                    "username": primary_email,
                },
            )

            user.first_name = data.get("first_name")
            user.last_name = data.get("last_name")
            user.picture = data.get("image_url")

            user.save()
        elif event["type"] == ClerkWebhookEvent.USER_DELETED.value:
            try:
                user = cls.objects.get(clerk_id=clerk_id)
                user.delete()
            except cls.DoesNotExist:
                pass


class Category(GenericModel, SlugifyModel):
    """
    Stores a single category entry :model:`apis.Category`.
    """

    name = models.CharField(unique=True)

    class Meta:
        verbose_name_plural = _("Categories")

    def __str__(self):
        return self.name


class Course(TaggifyModel):
    """
    Stores a single course entry :model:`apis.Course`.
    """

    name = models.CharField(unique=True)
    description = models.TextField()
    price = models.DecimalField(default=0.00, max_digits=10, decimal_places=2)
    thumbnail = models.URLField(max_length=200, blank=True)
    image = models.ImageField(
        upload_to="courses/%y/%m/%d",
        null=True,
        blank=True,
        storage=MediaCloudinaryStorage(),
    )

    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    @admin.display(description=_("Thumbnail"))
    def headshot_thumbnail(self):
        headshot = self.image.url if self.image else self.thumbnail
        return mark_safe(
            f'<img src={headshot} width="80" height="80" alt={self.name} class="img-thumbnail shadow" />'
        )

    @property
    def tags_indexing(self):
        """Tags for indexing.

        Used in Elasticsearch indexing.
        """
        return [tag.name for tag in self.tags.all()]

    @property
    def photo(self):
        return self.image or self.thumbnail


class Lesson(TaggifyModel):
    """
    Stores a single lesson entry :model:`apis.Lesson`.
    """

    name = models.CharField(unique=True)
    content = RichTextUploadingField()

    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    class Meta:
        unique_together = ["course", "name"]

    def __str__(self):
        return self.name


class Interaction(GenericModel):
    """A mixin to be inherited user interactions, linking a creator to a course."""

    creator = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="%(app_label)s_%(class)s_related",
    )
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    class Meta:
        abstract = True


class Comment(Interaction):
    """
    Stores a single comment entry :model:`apis.Comment`.
    """

    content = models.TextField()

    def __str__(self):
        return self.content[:10]
