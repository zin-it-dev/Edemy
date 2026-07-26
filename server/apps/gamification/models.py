import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone


class Level(models.Model):
    """Levels that users can reach based on their XP."""

    name = models.CharField(max_length=50, unique=True)
    required_xp = models.PositiveIntegerField(unique=True)
    badge_icon = models.CharField(max_length=100, blank=True, default="🔰")

    class Meta:
        ordering = ["required_xp"]

    def __str__(self):
        return f"{self.name} ({self.required_xp} XP)"


class DailyBountie(models.Model):
    """Daily tasks users can complete for rewards."""

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")
    xp_reward = models.PositiveIntegerField(default=10)
    coin_reward = models.PositiveIntegerField(default=5)
    target_count = models.PositiveIntegerField(
        default=1, help_text="Number of actions required"
    )
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.title} ({self.xp_reward} XP)"


class UserProgress(models.Model):
    """Overall learning progress of a user."""

    user = models.OneToOneField(
        "accounts.User", on_delete=models.CASCADE, related_name="overall_progress"
    )
    total_time_spent = models.PositiveIntegerField(
        default=0, help_text="Total time spent learning in seconds"
    )
    courses_completed_count = models.PositiveIntegerField(default=0)
    lessons_completed_count = models.PositiveIntegerField(default=0)
    quizzes_passed_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Progress for {self.user.email}"


class XPEvent(models.Model):
    """Log of XP gained by a user."""

    class Source(models.TextChoices):
        LESSON_COMPLETED = "LESSON_COMPLETED", _("Lesson Completed")
        COURSE_COMPLETED = "COURSE_COMPLETED", _("Course Completed")
        QUIZ_PASSED = "QUIZ_PASSED", _("Quiz Passed")
        DAILY_STREAK = "DAILY_STREAK", _("Daily Streak Bonus")
        BOUNTY_COMPLETED = "BOUNTY_COMPLETED", _("Daily Bounty Completed")
        MANUAL = "MANUAL", _("Manual Adjustment")

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        "accounts.User", on_delete=models.CASCADE, related_name="xp_events"
    )
    amount = models.IntegerField()
    source = models.CharField(max_length=50, choices=Source.choices)
    description = models.CharField(max_length=255, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [models.Index(fields=["user", "created_at"])]

    def __str__(self):
        return f"{self.user.email} +{self.amount} XP from {self.source}"


class DailyStreak(models.Model):
    """Tracks a user's consecutive days of learning."""

    user = models.OneToOneField(
        "accounts.User", on_delete=models.CASCADE, related_name="streak"
    )
    current_streak = models.PositiveIntegerField(default=0)
    longest_streak = models.PositiveIntegerField(default=0)
    last_check_in = models.DateField(null=True, blank=True)

    def check_in(self):
        """Register a check-in for today, updating the streak."""
        today = timezone.now().date()
        if self.last_check_in == today:
            return False  # Already checked in today

        if self.last_check_in == today - timezone.timedelta(days=1):
            # Consecutive day
            self.current_streak += 1
        else:
            # Streak broken, or first check-in
            self.current_streak = 1

        self.last_check_in = today
        if self.current_streak > self.longest_streak:
            self.longest_streak = self.current_streak

        self.save()
        return True

    def __str__(self):
        return f"{self.user.email}: {self.current_streak} days"
