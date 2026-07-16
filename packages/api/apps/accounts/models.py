from django.db import models
from django.contrib import admin
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from cloudinary_storage.storage import MediaCloudinaryStorage
from django.core.validators import MinValueValidator

from core.mixins import TimestampMixin, SoftDeleteMixin
from core.models import GenericModel
from core.fields import DynamicImageURLField
from .managers import UserManager


class Roles(models.TextChoices):
    ADMIN = "ADMIN", _("Admin")
    USER = "USER", _("User")
    TEACHER = "TEACHER", _("Teacher")
    
    
class User(AbstractUser):
    """Stores a single user entry :model:`app.User`."""

    clerk_id = models.CharField(max_length=255, unique=True, null=True, blank=True)
    email = models.EmailField(_("email address"), max_length=255, unique=True)
    picture = DynamicImageURLField(
        _("picture"),
        upload_to="avatars/%Y/%m/%d",
        null=True,
        blank=True
    )
    role = models.CharField(_("role"), max_length=8, choices=Roles, default=Roles.USER)
    subscription_id = models.CharField(_("subscription ID"), max_length=125)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
        ordering = ["-date_joined"]

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


class Profile(TimestampMixin):
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

    class Meta:
        verbose_name = _("profile")
        verbose_name_plural = _("profiles")

    def __str__(self):
        return f"Profile of {self.user}"
    
    
class Trophy(GenericModel):
    badge = models.ImageField(
        _("badge"),
        upload_to="badges/%Y/%m/%d",
        storage=MediaCloudinaryStorage(),
        null=True,
        blank=True,
        max_length=255,
    )
    description = models.TextField(
        blank=True, help_text="Mô tả điều kiện đạt huy hiệu"
    )
        
        
class Levels(SoftDeleteMixin, TimestampMixin):
    level_num = models.PositiveIntegerField(
        primary_key=True, 
        validators=[
            MinValueValidator(1)
        ],
        help_text="Cấp độ (Ví dụ: 1, 2, 3...)"
    )
    required_xp = models.PositiveIntegerField(
        default=0, help_text="Số điểm XP tối thiểu cần đạt để chạm mốc level này"
    )
    coin_reward = models.PositiveIntegerField(
        default=0, help_text="Số xu thưởng tặng cho user khi đạt cấp độ này"
    )
    title = models.CharField(
        max_length=100, unique=True, blank=True, help_text="Tên danh hiệu của cấp độ này"
    )

    class Meta:
        verbose_name = _("level")
        verbose_name_plural = _("levels")
        
    def __str__(self):
        return f"Level {self.level_num}: {self.title or 'No Title'}"
    
    
class UserStats(SoftDeleteMixin, TimestampMixin):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True, related_name="stats"
    )
    trophies = models.ManyToManyField(Trophy, through='TrophyCabinet', blank=True, related_name='achieved_by_stats')
    current_level = models.ForeignKey(
        Levels,
        on_delete=models.PROTECT,
        default=1,
        related_name="users_at_level",
    )
    
    xp = models.PositiveIntegerField(default=0, help_text="Tổng điểm kinh nghiệm tích lũy")
    coins = models.PositiveIntegerField(default=0, help_text="Số xu dùng để đổi quà/tính năng")
    daily_streak = models.PositiveIntegerField(default=0)
    longest_streak = models.PositiveIntegerField(default=0)
    last_checkin = models.DateTimeField(_("last checkin"), blank=True, null=True)
    credits = models.PositiveIntegerField(default=5)
    
    class Meta:
        verbose_name = _("user statistic")
        verbose_name_plural = _("user statistics")

    def __str__(self):
        return f"Stats of {self.user.email} - Level {self.current_level}"
    
    
class TrophyCabinet(SoftDeleteMixin, TimestampMixin):
    user_stats = models.ForeignKey(UserStats, on_delete=models.CASCADE, related_name='cabinet_items')
    trophy = models.ForeignKey(Trophy, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user_stats', 'trophy'], 
                name='unique_user_stats_trophy'
            )
        ]