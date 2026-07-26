import uuid, zoneinfo
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from core.models import GenericModel

from accounts.managers import TeacherManager, StudentManager, UserManager


class User(AbstractUser):
    """Stores a single user entry. Authenticated via Clerk."""

    class Role(models.TextChoices):
        ADMIN = "ADMIN", _("Admin")
        USER = "USER", _("User")
        TEACHER = "TEACHER", _("Teacher")

    id = models.UUIDField(primary_key=True, default=uuid.uuid7, editable=False)
    clerk_id = models.CharField(
        _("clerk user id"), max_length=255, unique=True, null=True, blank=True
    )
    email = models.EmailField(_("email address"), unique=True)
    role = models.CharField(
        _("role"), max_length=50, choices=Role.choices, default=Role.USER
    )
    bio = models.TextField(_("bio"), blank=True, default="")
    picture = models.URLField(_("profile picture url"), blank=True, default="")
    credits = models.PositiveIntegerField(
        _("AI credits"),
        default=5,
        help_text=_("Number of AI course generation credits remaining."),
    )
    timezone = models.CharField(
        _("timezone"),
        max_length=63,
        choices=[(tz, tz) for tz in sorted(zoneinfo.available_timezones())],
        default="UTC",
    )

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def get_role(self):
        if self.role == User.Role.ADMIN:
            return _("Admin")
        elif self.role == User.Role.TEACHER:
            return _("Teacher")
        return _("User")

    def is_teacher(self):
        return self.role == User.Role.TEACHER

    def is_admin_user(self):
        return self.role == User.Role.ADMIN or self.is_superuser

    @property
    def profile_image_url(self):
        return self.picture

    @profile_image_url.setter
    def profile_image_url(self, value):
        self.picture = value

    def __str__(self):
        return (
            self.get_full_name() or self.get_short_name() or "@{}".format(self.username)
        )


class Profile(GenericModel):
    """Extended profile for a User with gamification stats."""

    class Level(models.TextChoices):
        BEGINNER = "BEGINNER", _("Beginner")
        INTERMEDIATE = "INTERMEDIATE", _("Intermediate")
        ADVANCED = "ADVANCED", _("Advanced")
        EXPERT = "EXPERT", _("Expert")

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    trophies = models.ManyToManyField(
        "Trophy", through="UserTrophy", related_name="profiles", blank=True
    )
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)
    is_premium_member = models.BooleanField(default=False)
    # Gamification
    xp = models.PositiveIntegerField(_("experience points"), default=0)
    coins = models.PositiveIntegerField(_("coins"), default=0)
    level = models.CharField(
        _("level"), max_length=20, choices=Level.choices, default=Level.BEGINNER
    )
    # Legacy points field kept for compatibility
    points = models.PositiveIntegerField(default=0)
    daily_streak = models.PositiveIntegerField(default=0)
    longest_streak = models.PositiveIntegerField(default=0)
    customer_id = models.CharField(max_length=255, unique=True, null=True, blank=True)

    def __str__(self):
        return f"Profile({self.user.email})"

    def add_xp(self, amount: int):
        """Add XP and update level accordingly."""
        self.xp += amount
        self.points += amount
        # Level thresholds
        if self.xp >= 10000:
            self.level = Profile.Level.EXPERT
        elif self.xp >= 3000:
            self.level = Profile.Level.ADVANCED
        elif self.xp >= 1000:
            self.level = Profile.Level.INTERMEDIATE
        else:
            self.level = Profile.Level.BEGINNER
        self.save(update_fields=["xp", "points", "level"])

    def add_coins(self, amount: int):
        """Add coins to user balance."""
        self.coins += amount
        self.save(update_fields=["coins"])


class UserActivity(GenericModel):
    class ActivityType(models.TextChoices):
        COMPLETE_LESSON = "COMPLETE_LESSON", _("Complete Lesson")
        COMPLETE_CHAPTER = "COMPLETE_CHAPTER", _("Complete Chapter")
        COMPLETE_COURSE = "COMPLETE_COURSE", _("Complete Course")
        GIVE_QUIZ = "GIVE_QUIZ", _("Give Quiz")
        CHECK_IN = "CHECK_IN", _("Daily Check-in")
        CREATE_COURSE = "CREATE_COURSE", _("Create Course")

    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name="activities",
    )
    activity_type = models.CharField(max_length=50, choices=ActivityType.choices)
    xp_earned = models.PositiveIntegerField(default=0)
    coins_earned = models.PositiveIntegerField(default=0)
    # Legacy field
    points_earned = models.PositiveIntegerField(default=0)
    description = models.CharField(max_length=255, blank=True, default="")

    class Meta:
        indexes = [
            models.Index(fields=["profile", "created"]),
            models.Index(fields=["activity_type"]),
        ]

    def __str__(self):
        return (
            f"{self.profile.user.email} — {self.activity_type} (+{self.xp_earned} XP)"
        )


class Trophy(models.Model):
    """A trophy/badge that users can earn by reaching milestones."""

    class ActivityMetric(models.TextChoices):
        XP_COUNT = "XP_COUNT", _("XP Count")
        COURSE_COUNT = "COURSE_COUNT", _("Course Count")
        STREAK_DAYS = "STREAK_DAYS", _("Streak Days")
        QUIZ_COUNT = "QUIZ_COUNT", _("Quiz Count")
        COIN_COUNT = "COIN_COUNT", _("Coin Count")

    name = models.CharField(max_length=100, default="")
    description = models.TextField()
    icon = models.CharField(max_length=100, blank=True, default="🏆")
    requirement_type = models.CharField(max_length=50, choices=ActivityMetric.choices)
    requirement_value = models.PositiveBigIntegerField()
    xp_reward = models.PositiveIntegerField(default=0)
    coin_reward = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.icon} {self.name}"


class UserTrophy(GenericModel):
    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name="earned_trophies",
    )
    trophy = models.ForeignKey(
        Trophy,
        on_delete=models.CASCADE,
        related_name="trophy_users",
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["profile", "trophy"],
                name="unique_user_trophy",
            )
        ]

    def __str__(self):
        return f"{self.profile.user.email} earned {self.trophy.name}"


class Teacher(User):
    objects = TeacherManager()

    class Meta:
        proxy = True

    def save(self, *args, **kwargs):
        if not self.pk:
            self.role = User.Role.TEACHER
            self.is_staff = True
        return super().save(*args, **kwargs)


class Student(User):
    objects = StudentManager()

    class Meta:
        proxy = True

    def save(self, *args, **kwargs):
        if not self.pk:
            self.role = User.Role.USER
        return super().save(*args, **kwargs)
