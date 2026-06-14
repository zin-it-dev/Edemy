import uuid

from cloudinary_storage.storage import MediaCloudinaryStorage
from django.contrib import admin
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _

from .managers import TeacherManager, UserManager
from .organic import (
    AuditMixin,
    Generic,
    Interaction,
    Review,
    SluggedMixin,
    SoftDeleteMixin,
)


class User(AbstractUser):
    """Stores a single user entry :model:`app.User`."""

    class Roles(models.TextChoices):
        ADMIN = "ADMIN", _("Admin")
        USER = "USER", _("User")
        TEACHER = "TEACHER", _("Teacher")

    clerk_id = models.CharField(max_length=255, unique=True, null=True, blank=True)
    email = models.EmailField(_("email address"), max_length=255, unique=True)
    picture = models.ImageField(
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
            self.username,
        )

    def __str__(self):
        return self.get_full_name() or self.email


class Profile(AuditMixin):
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


class Teacher(User):
    class Meta:
        proxy = True
        verbose_name = _("teacher")
        verbose_name_plural = _("teachers")

    objects = TeacherManager()

    def save(self, *args, **kwargs):
        self.role = User.Roles.TEACHER
        self.is_staff = True
        return super().save(*args, **kwargs)


class Category(SluggedMixin, SoftDeleteMixin, AuditMixin):
    """Stores a single category entry, related to :model:`app.Category`."""

    name = models.CharField(_("name"), max_length=80, unique=True)

    class Meta(AuditMixin.Meta):
        verbose_name = _("category")
        verbose_name_plural = _("categories")

    def __str__(self):
        return self.name


class Course(Generic):
    """
    Stores a single course entry, related to :model:`app.Course` :model:`app.Category` and
    :model:`app.User`.
    """

    name = models.CharField(_("name"), max_length=120)
    price = models.DecimalField(
        _("price"), max_digits=10, decimal_places=2, default=0.00
    )
    thumbnail = models.ImageField(upload_to="courses/%Y/%m/%d")
    description = models.TextField(_("description"), null=True, blank=True)
    categories = models.ManyToManyField(
        Category,
        verbose_name=_("list of categories"),
        related_name="courses",
        blank=True,
    )
    teacher = models.ForeignKey(
        Teacher,
        verbose_name=_("teacher"),
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="courses",
        related_query_name="course",
    )

    class Meta(Generic.Meta):
        verbose_name = _("course")
        verbose_name_plural = _("courses")

    @admin.display(description="Photo")
    def photo(self):
        return format_html(
            '<img src={} width="80" height="80" alt={} class="img-thumbnail shadow" />',
            self.thumbnail,
            self.name,
        )

    def __str__(self):
        return self.name


class Lesson(Generic):
    """
    Stores a single lesson entry, related to :model:`app.Lesson` and
    :model:`app.Course`.
    """

    name = models.CharField(_("name"), max_length=120)
    video_url = models.URLField(_("video"), blank=True)
    content = models.TextField(_("content"))
    course = models.ForeignKey(
        Course,
        verbose_name=_("course"),
        on_delete=models.CASCADE,
        related_name="lessons",
        related_query_name="lesson",
    )

    class Meta(Generic.Meta):
        verbose_name = _("lesson")
        verbose_name_plural = _("lessons")
        constraints = [
            models.UniqueConstraint(
                fields=["name", "course"], name="unique_name_course"
            )
        ]

    def __str__(self):
        return self.name


class Resource(SoftDeleteMixin, AuditMixin):
    """
    Stores a single resource entry, related to :model:`app.Resource` and
    :model:`app.Lesson`.
    """

    file = models.URLField(_("file"))
    lesson = models.ForeignKey(
        Lesson,
        verbose_name=_("lesson"),
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="resources",
        related_query_name="resource",
    )

    class Meta:
        verbose_name = _("resource")
        verbose_name_plural = _("resources")


class Comment(SoftDeleteMixin, Review):
    """
    Stores a single comment entry, related to :model:`app.Comment` and
    :model:`app.User`.
    """

    content = models.TextField(_("content"))

    class Meta(Review.Meta):
        verbose_name = _("comment")
        verbose_name_plural = _("comments")

    def __str__(self):
        return self.content


class Like(Review):
    """
    Stores a single like entry, related to :model:`app.Like` and
    :model:`app.User`.
    """

    is_liked = models.BooleanField(_("liked"), default=False)

    class Meta(Review.Meta):
        verbose_name = _("like")
        verbose_name_plural = _("likes")
        constraints = [
            models.UniqueConstraint(
                fields=["creator", "content_type", "object_id"],
                name="unique_liked_creator",
            )
        ]


class Enrollment(Interaction):
    """
    Stores a single enrollment entry, related to :model:`app.Enrollment` :model:`app.Course` and
    :model:`app.User`.
    """

    class Status(models.TextChoices):
        PENDING = "PE", _("Pending")
        COMPLETED = "CO", _("Completed")
        CANCELLED = "CA", _("Cancelled")

    status = models.CharField(
        _("status"),
        max_length=2,
        choices=Status,
        default=Status.PENDING,
    )

    class Meta(Interaction.Meta):
        verbose_name = _("enrollment")
        verbose_name_plural = _("enrollments")


class Payment(AuditMixin, SoftDeleteMixin):
    """
    Stores a single payment entry, related to :model:`app.Payment` and
    :model:`app.User`.
    """

    class Methods(models.TextChoices):
        MOMO = "momo", _("MoMo")
        VNPAY = "vnpay", _("VNPAY")
        STRIPE = "stripe", _("STRIPE")

    enrollment = models.ForeignKey(
        Enrollment, on_delete=models.CASCADE, verbose_name=_("enrollment")
    )
    total_price = models.DecimalField(
        _("total price"), max_digits=10, decimal_places=2, default=0.00
    )
    transaction_id = models.CharField(_("transaction id"), max_length=255, unique=True)
    method = models.CharField(
        _("method"),
        max_length=10,
        choices=Methods,
        default=Methods.STRIPE,
    )

    class Meta:
        verbose_name = _("payment")
        verbose_name_plural = _("payments")


class Certificate(Interaction):
    """
    Stores a single certificate entry, related to :model:`app.Certificate` :model:`app.Course` and
    :model:`app.User`.
    """

    certificate_code = models.CharField(
        _("certificate code"), max_length=100, unique=True, default=uuid.uuid4
    )
    pdf_url = models.URLField(_("pdf url"), max_length=500, blank=True, null=True)

    class Meta(Interaction.Meta):
        verbose_name = _("certificate")
        verbose_name_plural = _("certificates")


class Quiz(SoftDeleteMixin, AuditMixin):
    creator = models.ForeignKey(
        Teacher,
        verbose_name=_("creator"),
        on_delete=models.CASCADE,
        related_name="quiz_created",
        related_query_name="quizzes",
    )
    lesson = models.ForeignKey(
        Lesson,
        on_delete=models.CASCADE,
        related_name="quizzes",
        related_query_name="quiz",
    )
    name = models.CharField(max_length=125)
    description = models.TextField(blank=True)
    score = models.FloatField(default=50.0)

    def __str__(self):
        return self.name


class Question(models.Model):
    class Types(models.TextChoices):
        MCQ = "MCQ", _("Multiple Choice Question")
        ESSAY = "ESSAY", _("Essay")

    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="questions")
    content = models.TextField()
    type = models.CharField(max_length=10, choices=Types.choices, default=Types.MCQ)

    def __str__(self):
        return self.content[:50]


class Choice(SoftDeleteMixin, AuditMixin):
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="choices"
    )
    content = models.CharField(max_length=125)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.content


class Submission(models.Model):
    student = models.ForeignKey(
        User,
        verbose_name=_("student"),
        on_delete=models.CASCADE,
        limit_choices_to=models.Q(role="USER"),
        related_name="submissions",
        related_query_name="submission",
    )
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name="submissions")
    score = models.FloatField(null=True, blank=True)
    feedback = models.TextField(null=True, blank=True)
    is_graded = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["student", "quiz"], name="unique_student_quiz_submission"
            )
        ]

    def __str__(self):
        return f"{self.student.get_full_name()} - {self.quiz.name}"


class Answer(SoftDeleteMixin, AuditMixin):
    submission = models.ForeignKey(
        Submission, on_delete=models.CASCADE, related_name="answers"
    )
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    choice = models.ForeignKey(Choice, on_delete=models.SET_NULL, null=True, blank=True)
    content = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Answer for {self.question.content[:20]}"
