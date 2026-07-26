import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator
from core.models import CommonInfo, CommonContent


class Category(CommonInfo):
    title = models.CharField(_("title"), max_length=80, unique=True)

    class Meta:
        verbose_name = _("category")
        verbose_name_plural = _("categories")

    def __str__(self):
        return self.title


class Course(CommonContent):
    class Level(models.TextChoices):
        BEGINNER = "BEGINNER", _("Beginner")
        INTERMEDIATE = "INTERMEDIATE", _("Intermediate")
        ADVANCED = "ADVANCED", _("Advanced")

    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, related_name="courses"
    )
    instructor = models.ForeignKey(
        "accounts.User",
        on_delete=models.SET_NULL,
        null=True,
        related_name="instructed_courses",
    )
    title = models.CharField(_("title"), max_length=125, unique=True)
    thumbnail = models.URLField(blank=True, default="")
    price = models.DecimalField(
        _("price"), max_digits=10, decimal_places=2, default=0.00
    )
    discount = models.PositiveIntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    is_free = models.BooleanField(default=False)
    level = models.CharField(
        _("level"), max_length=20, choices=Level.choices, default=Level.BEGINNER
    )
    # Course structure stored as JSON (outline from AI)
    course_layout = models.JSONField(null=True, blank=True)

    class Meta:
        ordering = ["-created"]
        indexes = [
            models.Index(fields=["level"]),
            models.Index(fields=["instructor"]),
            models.Index(fields=["category"]),
        ]

    @property
    def effective_price(self):
        if self.is_free:
            return 0
        if self.discount > 0:
            return self.price * (1 - self.discount / 100)
        return self.price

    @property
    def enrollment_amount(self):
        return self.enrollments.count()

    @property
    def average_rating(self):
        reviews = self.reviews.all()
        if not reviews.exists():
            return 0
        return reviews.aggregate(models.Avg("rating"))["rating__avg"] or 0

    def __str__(self):
        return self.title


class Module(CommonInfo):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="modules")
    position = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["position"]
        constraints = [
            models.UniqueConstraint(
                fields=["course", "position"], name="unique_module_position_in_course"
            ),
        ]

    def __str__(self):
        return f"{self.course.title} — Module {self.position}: {self.title}"


class Lesson(CommonContent):
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name="lessons")
    title = models.CharField(_("title"), max_length=255)
    # Content
    content = models.TextField(blank=True, default="")  # Markdown content
    video_url = models.URLField(blank=True, default="")  # YouTube or direct URL
    # Position
    order = models.PositiveIntegerField(default=1)
    # XP reward for completing this lesson
    xp_reward = models.PositiveIntegerField(default=10)
    coin_reward = models.PositiveIntegerField(default=5)
    is_free_preview = models.BooleanField(default=False)

    class Meta:
        ordering = ["order"]
        constraints = [
            models.UniqueConstraint(
                fields=["module", "order"], name="unique_lesson_order_in_module"
            ),
        ]

    def __str__(self):
        return f"{self.module.title} — Lesson {self.order}: {self.title}"


class Attachment(models.Model):
    """A file or link attached to a Lesson."""

    class AttachmentType(models.TextChoices):
        PDF = "PDF", _("PDF Document")
        LINK = "LINK", _("External Link")
        MARKDOWN = "MARKDOWN", _("Markdown File")

    lesson = models.ForeignKey(
        Lesson, on_delete=models.CASCADE, related_name="attachments"
    )
    title = models.CharField(max_length=255)
    attachment_type = models.CharField(
        max_length=20, choices=AttachmentType.choices, default=AttachmentType.LINK
    )
    url = models.URLField(blank=True, default="")
    file = models.FileField(upload_to="attachments/", blank=True, null=True)

    def __str__(self):
        return f"{self.lesson.title} — {self.title}"


class Enrollment(models.Model):
    """Tracks a student's enrollment in a course."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="enrollments"
    )
    student = models.ForeignKey(
        "accounts.User", on_delete=models.CASCADE, related_name="enrollments"
    )
    enrolled_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    is_completed = models.BooleanField(default=False)
    # Certificate
    certificate_issued = models.BooleanField(default=False)
    certificate_url = models.URLField(blank=True, default="")

    class Meta:
        unique_together = ("student", "course")
        ordering = ["-enrolled_at"]

    @property
    def progress_percentage(self):
        total = Lesson.objects.filter(module__course=self.course).count()
        if total == 0:
            return 0
        completed = LessonProgress.objects.filter(
            enrollment=self, is_completed=True
        ).count()
        return round((completed / total) * 100)

    def __str__(self):
        return f"{self.student.email} → {self.course.title}"


class LessonProgress(models.Model):
    """Tracks a student's progress on individual lessons."""

    enrollment = models.ForeignKey(
        Enrollment, on_delete=models.CASCADE, related_name="lesson_progresses"
    )
    lesson = models.ForeignKey(
        Lesson, on_delete=models.CASCADE, related_name="progresses"
    )
    is_completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    time_spent = models.PositiveIntegerField(
        default=0, help_text="Seconds spent on lesson"
    )

    class Meta:
        unique_together = ("enrollment", "lesson")

    def __str__(self):
        status = "✅" if self.is_completed else "⏳"
        return f"{status} {self.enrollment.student.email} — {self.lesson.title}"


class CourseReview(models.Model):
    """A rating and review left by a student for a course."""

    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="reviews")
    student = models.ForeignKey(
        "accounts.User", on_delete=models.CASCADE, related_name="reviews"
    )
    rating = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    comment = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("course", "student")
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.student.email} rated {self.course.title}: {self.rating}⭐"


class CourseComment(models.Model):
    """A discussion comment on a Lesson."""

    lesson = models.ForeignKey(
        Lesson, on_delete=models.CASCADE, related_name="comments"
    )
    author = models.ForeignKey(
        "accounts.User", on_delete=models.CASCADE, related_name="lesson_comments"
    )
    parent = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, related_name="replies"
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"{self.author.email}: {self.content[:60]}"


class Subtopic(models.Model):
    """A smaller topic or section within a Lesson."""

    lesson = models.ForeignKey(
        Lesson, on_delete=models.CASCADE, related_name="subtopics"
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, default="")
    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["order"]
        constraints = [
            models.UniqueConstraint(
                fields=["lesson", "order"], name="unique_subtopic_order_in_lesson"
            ),
        ]

    def __str__(self):
        return f"{self.lesson.title} - {self.title}"


class StudyTypeContent(models.Model):
    """Polymorphic content for different learning formats (video, text, interactive, etc.)"""

    class Type(models.TextChoices):
        VIDEO = "VIDEO", _("Video")
        TEXT = "TEXT", _("Text Article")
        QUIZ = "QUIZ", _("Quiz")
        INTERACTIVE = "INTERACTIVE", _("Interactive / Code")

    lesson = models.ForeignKey(
        Lesson, on_delete=models.CASCADE, related_name="study_contents"
    )
    content_type = models.CharField(max_length=20, choices=Type.choices)
    title = models.CharField(max_length=255, blank=True, default="")
    content = models.TextField(blank=True, default="")
    url = models.URLField(blank=True, default="")
    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"[{self.content_type}] {self.title or self.lesson.title}"


class ChapterContentSlide(models.Model):
    """A slide in a slide-based lesson or chapter."""

    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name="slides")
    order = models.PositiveIntegerField(default=1)
    title = models.CharField(max_length=255, blank=True, default="")
    content = models.TextField(blank=True, default="")
    image_url = models.URLField(blank=True, default="")
    audio_url = models.URLField(blank=True, default="")

    class Meta:
        ordering = ["order"]
        constraints = [
            models.UniqueConstraint(
                fields=["lesson", "order"], name="unique_slide_order_in_lesson"
            ),
        ]

    def __str__(self):
        return f"{self.lesson.title} - Slide {self.order}"


class DiscussionRoom(models.Model):
    """A discussion forum or chat room for a course."""

    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name="discussion_rooms"
    )
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.course.title})"
