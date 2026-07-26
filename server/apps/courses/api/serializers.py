from rest_framework import serializers
from courses.models import (
    Category,
    Course,
    Module,
    Lesson,
    Attachment,
    Enrollment,
    LessonProgress,
    CourseReview,
    CourseComment,
)


class CategorySerializer(serializers.ModelSerializer):
    amount = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "icon",
            "color",
            "order",
            "amount",
        ]

    def get_amount(self, obj):
        return obj.courses.filter(status=Course.Status.PUBLISHED).count()


class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ["id", "title", "attachment_type", "url", "file"]


class LessonSerializer(serializers.ModelSerializer):
    attachments = AttachmentSerializer(many=True, read_only=True)
    is_completed = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = [
            "id",
            "title",
            "lesson_type",
            "content",
            "video_url",
            "video_duration",
            "code_starter",
            "code_language",
            "order",
            "xp_reward",
            "coin_reward",
            "is_free_preview",
            "attachments",
            "is_completed",
        ]

    def get_is_completed(self, obj):
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return False
        return LessonProgress.objects.filter(
            enrollment__student=request.user,
            lesson=obj,
            is_completed=True,
        ).exists()


class LessonListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for lesson lists (no content body)."""

    is_completed = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = [
            "id",
            "title",
            "lesson_type",
            "video_duration",
            "order",
            "xp_reward",
            "is_free_preview",
            "is_completed",
        ]

    def get_is_completed(self, obj):
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return False
        return LessonProgress.objects.filter(
            enrollment__student=request.user,
            lesson=obj,
            is_completed=True,
        ).exists()


class ModuleSerializer(serializers.ModelSerializer):
    lessons = LessonListSerializer(many=True, read_only=True)
    lesson_count = serializers.SerializerMethodField()

    class Meta:
        model = Module
        fields = [
            "id",
            "title",
            "description",
            "position",
            "is_free_preview",
            "lessons",
            "lesson_count",
        ]

    def get_lesson_count(self, obj):
        return obj.lessons.count()


class CourseListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for course cards/lists."""

    category = CategorySerializer(read_only=True)
    instructor_name = serializers.SerializerMethodField()
    instructor_picture = serializers.SerializerMethodField()
    average_rating = serializers.FloatField(read_only=True)
    enrollment_count = serializers.IntegerField(read_only=True)
    effective_price = serializers.DecimalField(
        max_digits=10, decimal_places=2, read_only=True
    )
    is_enrolled = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "banner_image",
            "level",
            "status",
            "language",
            "price",
            "discount",
            "effective_price",
            "is_free",
            "category",
            "instructor_name",
            "instructor_picture",
            "average_rating",
            "enrollment_count",
            "is_enrolled",
            "is_ai_generated",
            "date_created",
        ]

    def get_instructor_name(self, obj):
        if obj.instructor:
            return obj.instructor.get_full_name() or obj.instructor.username
        return "Edemy AI"

    def get_instructor_picture(self, obj):
        return obj.instructor.picture if obj.instructor else ""

    def get_is_enrolled(self, obj):
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return False
        return obj.enrollments.filter(student=request.user).exists()


class CourseDetailSerializer(CourseListSerializer):
    """Full serializer including modules and lessons."""

    modules = ModuleSerializer(many=True, read_only=True)
    module_count = serializers.SerializerMethodField()
    total_lessons = serializers.SerializerMethodField()
    total_duration = serializers.SerializerMethodField()
    user_progress = serializers.SerializerMethodField()

    class Meta(CourseListSerializer.Meta):
        fields = CourseListSerializer.Meta.fields + [
            "intro_video_url",
            "course_layout",
            "modules",
            "module_count",
            "total_lessons",
            "total_duration",
            "user_progress",
        ]

    def get_module_count(self, obj):
        return obj.modules.count()

    def get_total_lessons(self, obj):
        return Lesson.objects.filter(module__course=obj).count()

    def get_total_duration(self, obj):
        from django.db.models import Sum

        result = Lesson.objects.filter(module__course=obj).aggregate(
            Sum("video_duration")
        )
        return result["video_duration__sum"] or 0

    def get_user_progress(self, obj):
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return None
        enrollment = obj.enrollments.filter(student=request.user).first()
        if not enrollment:
            return None
        return {
            "percentage": enrollment.progress_percentage,
            "is_completed": enrollment.is_completed,
            "certificate_issued": enrollment.certificate_issued,
            "certificate_url": enrollment.certificate_url,
        }


class EnrollmentSerializer(serializers.ModelSerializer):
    course = CourseListSerializer(read_only=True)
    progress_percentage = serializers.IntegerField(read_only=True)

    class Meta:
        model = Enrollment
        fields = [
            "id",
            "course",
            "enrolled_at",
            "completed_at",
            "is_completed",
            "certificate_issued",
            "certificate_url",
            "progress_percentage",
        ]
        read_only_fields = ["id", "enrolled_at", "completed_at", "is_completed"]


class LessonProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonProgress
        fields = ["id", "lesson", "is_completed", "completed_at", "time_spent"]


class CourseReviewSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()
    student_picture = serializers.SerializerMethodField()

    class Meta:
        model = CourseReview
        fields = [
            "id",
            "rating",
            "comment",
            "created_at",
            "student_name",
            "student_picture",
        ]
        read_only_fields = ["id", "created_at", "student_name", "student_picture"]

    def get_student_name(self, obj):
        return obj.student.get_full_name() or obj.student.username

    def get_student_picture(self, obj):
        return obj.student.picture


class CourseCommentSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    author_picture = serializers.SerializerMethodField()
    replies = serializers.SerializerMethodField()

    class Meta:
        model = CourseComment
        fields = [
            "id",
            "lesson",
            "parent",
            "content",
            "created_at",
            "author_name",
            "author_picture",
            "replies",
        ]
        read_only_fields = ["id", "created_at"]

    def get_author_name(self, obj):
        return obj.author.get_full_name() or obj.author.username

    def get_author_picture(self, obj):
        return obj.author.picture

    def get_replies(self, obj):
        if obj.parent is not None:
            return []
        replies = obj.replies.all()
        return CourseCommentSerializer(replies, many=True, context=self.context).data
