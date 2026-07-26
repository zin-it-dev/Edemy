from django.utils import timezone
from rest_framework import viewsets, status, filters, generics
from rest_framework.decorators import action
from rest_framework.permissions import (
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
    AllowAny,
)
from rest_framework.response import Response
from django.db.models import Avg, Count
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiParameter

from courses.models import (
    Category,
    Course,
    Module,
    Lesson,
    Enrollment,
    LessonProgress,
    CourseReview,
    CourseComment,
)
from courses.api.serializers import (
    CategorySerializer,
    CourseListSerializer,
    CourseDetailSerializer,
    ModuleSerializer,
    LessonSerializer,
    EnrollmentSerializer,
    LessonProgressSerializer,
    CourseReviewSerializer,
    CourseCommentSerializer,
)
from courses.permissions import IsInstructorOrAdmin, IsOwnerOrAdmin
from courses.filters import CourseFilter


@extend_schema_view(
    list=extend_schema(
        summary="List categories"
    )
)
class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    """List all categories."""

    queryset = Category.objects.all()
    serializer_class = CategorySerializer


@extend_schema_view(
    list=extend_schema(
        summary="List published courses",
        parameters=[
            OpenApiParameter(name="search", description="Search keyword"),
            OpenApiParameter(name="category", description="Category slug"),
            OpenApiParameter(
                name="level", description="BEGINNER|INTERMEDIATE|ADVANCED"
            ),
        ],
    ),
)
class CourseViewSet(viewsets.ModelViewSet):
    """
    CRUD for courses.

    - Anyone can list/retrieve published courses.
    - Only authenticated users can enroll.
    - Only instructors/admins can create/edit/delete.
    """

    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = CourseFilter
    ordering_fields = ["date_created", "price", "average_rating", "enrollment_count"]
    ordering = ["-date_created"]

    def get_queryset(self):
        qs = Course.objects.select_related("category", "instructor").annotate(
            average_rating=Avg("reviews__rating"),
            enrollment_count=Count("enrollments"),
        )
        if self.action in ["list", "retrieve"]:
            # Public users see only published courses
            if not self.request.user.is_authenticated:
                return qs.filter(status=Course.Status.PUBLISHED)
            # Teachers see their own + published
            if self.request.user.is_teacher():
                return qs.filter(status=Course.Status.PUBLISHED) | qs.filter(
                    instructor=self.request.user
                )
        # Admins see all
        if self.request.user.is_authenticated and self.request.user.is_admin_user():
            return qs
        return qs.filter(status=Course.Status.PUBLISHED)

    def get_serializer_class(self):
        if self.action in ["retrieve", "create", "update", "partial_update"]:
            return CourseDetailSerializer
        return CourseListSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]
        if self.action in ["create"]:
            return [IsAuthenticated()]
        if self.action in ["update", "partial_update", "destroy"]:
            return [IsAuthenticated(), IsInstructorOrAdmin()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user)

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def enroll(self, request, pk=None):
        """Enroll the current user in this course."""
        course = self.get_object()
        student = request.user

        if course.enrollments.filter(student=student).exists():
            return Response(
                {"detail": "Already enrolled in this course."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if course is free or user has access
        if not course.is_free and course.price > 0:
            # Check if they have a valid order/subscription
            has_access = (
                student.orders.filter(course=course, status="COMPLETED").exists()
                if hasattr(student, "orders")
                else False
            )
            if not has_access and not getattr(
                student.profile, "is_premium_member", False
            ):
                return Response(
                    {"detail": "Purchase required to enroll."},
                    status=status.HTTP_402_PAYMENT_REQUIRED,
                )

        enrollment = Enrollment.objects.create(course=course, student=student)
        return Response(
            {"detail": "Enrolled successfully!", "enrollment_id": str(enrollment.id)},
            status=status.HTTP_201_CREATED,
        )

    @action(detail=True, methods=["get"], permission_classes=[IsAuthenticated])
    def progress(self, request, pk=None):
        """Get the current user's progress in this course."""
        course = self.get_object()
        enrollment = course.enrollments.filter(student=request.user).first()
        if not enrollment:
            return Response(
                {"detail": "Not enrolled."}, status=status.HTTP_404_NOT_FOUND
            )

        total_lessons = Lesson.objects.filter(module__course=course).count()
        completed_lessons = LessonProgress.objects.filter(
            enrollment=enrollment, is_completed=True
        ).count()

        return Response(
            {
                "course_id": str(course.id),
                "total_lessons": total_lessons,
                "completed_lessons": completed_lessons,
                "percentage": enrollment.progress_percentage,
                "is_completed": enrollment.is_completed,
                "certificate_issued": enrollment.certificate_issued,
                "certificate_url": enrollment.certificate_url,
            }
        )

    @action(
        detail=True, methods=["post"], url_path="lessons/(?P<lesson_id>[^/.]+)/complete"
    )
    def mark_lesson_complete(self, request, pk=None, lesson_id=None):
        """Mark a lesson as completed and award XP/coins."""
        course = self.get_object()
        enrollment = course.enrollments.filter(student=request.user).first()
        if not enrollment:
            return Response(
                {"detail": "Not enrolled."}, status=status.HTTP_404_NOT_FOUND
            )

        try:
            lesson = Lesson.objects.get(id=lesson_id, module__course=course)
        except Lesson.DoesNotExist:
            return Response(
                {"detail": "Lesson not found."}, status=status.HTTP_404_NOT_FOUND
            )

        progress, created = LessonProgress.objects.get_or_create(
            enrollment=enrollment,
            lesson=lesson,
            defaults={"is_completed": True, "completed_at": timezone.now()},
        )

        xp_earned = 0
        coins_earned = 0

        if created or not progress.is_completed:
            progress.is_completed = True
            progress.completed_at = timezone.now()
            progress.save(update_fields=["is_completed", "completed_at"])
            # Award XP and coins
            xp_earned = lesson.xp_reward
            coins_earned = lesson.coin_reward
            if hasattr(request.user, "profile"):
                request.user.profile.add_xp(xp_earned)
                request.user.profile.add_coins(coins_earned)
                # Log activity
                from accounts.models import UserActivity

                UserActivity.objects.create(
                    profile=request.user.profile,
                    activity_type=UserActivity.ActivityType.COMPLETE_LESSON,
                    xp_earned=xp_earned,
                    coins_earned=coins_earned,
                    points_earned=xp_earned,
                    description=f"Completed: {lesson.title}",
                )

        # Check if entire course is completed
        total = Lesson.objects.filter(module__course=course).count()
        completed = LessonProgress.objects.filter(
            enrollment=enrollment, is_completed=True
        ).count()
        if total > 0 and completed >= total and not enrollment.is_completed:
            enrollment.is_completed = True
            enrollment.completed_at = timezone.now()
            enrollment.save(update_fields=["is_completed", "completed_at"])
            # Bonus XP for completing course
            bonus_xp = 100
            if hasattr(request.user, "profile"):
                request.user.profile.add_xp(bonus_xp)
                xp_earned += bonus_xp

        return Response(
            {
                "lesson_id": str(lesson.id),
                "is_completed": True,
                "xp_earned": xp_earned,
                "coins_earned": coins_earned,
                "course_progress": enrollment.progress_percentage,
            }
        )

    @action(detail=True, methods=["get", "post"], url_path="reviews")
    def reviews(self, request, pk=None):
        """Get or submit a review for a course."""
        course = self.get_object()

        if request.method == "GET":
            reviews = course.reviews.select_related("student").all()
            serializer = CourseReviewSerializer(reviews, many=True)
            return Response(serializer.data)

        if request.method == "POST":
            if not course.enrollments.filter(student=request.user).exists():
                return Response(
                    {"detail": "Must be enrolled to review."},
                    status=status.HTTP_403_FORBIDDEN,
                )
            serializer = CourseReviewSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(course=course, student=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(
        detail=True,
        methods=["get"],
        url_path="my-courses",
        permission_classes=[IsAuthenticated],
    )
    def my_courses(self, request, pk=None):
        """Not used on this viewset — see EnrollmentViewSet."""
        pass


class LessonViewSet(viewsets.ModelViewSet):
    """CRUD for individual lessons."""

    serializer_class = LessonSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Lesson.objects.select_related("module__course").prefetch_related(
            "attachments"
        )

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]
        return [IsAuthenticated(), IsInstructorOrAdmin()]

    @action(detail=True, methods=["get", "post"], url_path="comments")
    def comments(self, request, pk=None):
        """List or post comments for a lesson."""
        lesson = self.get_object()

        if request.method == "GET":
            comments = (
                lesson.comments.filter(parent=None)
                .select_related("author")
                .prefetch_related("replies__author")
            )
            serializer = CourseCommentSerializer(
                comments, many=True, context={"request": request}
            )
            return Response(serializer.data)

        serializer = CourseCommentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(lesson=lesson, author=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class EnrollmentViewSet(viewsets.ReadOnlyModelViewSet):
    """List the current user's enrollments."""

    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            Enrollment.objects.filter(student=self.request.user)
            .select_related("course__category", "course__instructor")
            .order_by("-enrolled_at")
        )
