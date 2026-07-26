from django.contrib import admin
from unfold.admin import ModelAdmin
from courses.models import Category, Course, Module, Lesson, Attachment, Enrollment, LessonProgress, CourseReview, CourseComment, Subtopic, StudyTypeContent, ChapterContentSlide, DiscussionRoom


@admin.register(Category)
class CategoryAdmin(ModelAdmin):
    list_display = (
        'created',
        'modified',
        'is_removed',
        'description',
        'slug',
        'id',
        'title',
    )
    list_filter = ('created', 'modified', 'is_removed')
    search_fields = ('slug',)


@admin.register(Course)
class CourseAdmin(ModelAdmin):
    list_display = (
        'created',
        'modified',
        'is_removed',
        'description',
        'slug',
        'id',
        'category',
        'instructor',
        'title',
        'thumbnail',
        'price',
        'discount',
        'is_free',
        'level',
        'course_layout',
    )
    list_filter = (
        'created',
        'modified',
        'is_removed',
        'category',
        'instructor',
        'is_free',
    )
    search_fields = ('slug',)


@admin.register(Module)
class ModuleAdmin(ModelAdmin):
    list_display = (
        'created',
        'modified',
        'is_removed',
        'title',
        'description',
        'slug',
        'id',
        'course',
        'position',
    )
    list_filter = ('created', 'modified', 'is_removed', 'course')
    search_fields = ('slug',)


@admin.register(Lesson)
class LessonAdmin(ModelAdmin):
    list_display = (
        'created',
        'modified',
        'is_removed',
        'description',
        'slug',
        'id',
        'thumbnail',
        'module',
        'title',
        'content',
        'video_url',
        'order',
        'xp_reward',
        'coin_reward',
        'is_free_preview',
    )
    list_filter = (
        'created',
        'modified',
        'is_removed',
        'module',
        'is_free_preview',
    )
    search_fields = ('slug',)


@admin.register(Attachment)
class AttachmentAdmin(ModelAdmin):
    list_display = (
        'id',
        'lesson',
        'title',
        'attachment_type',
        'url',
        'file',
    )
    list_filter = ('lesson',)


@admin.register(Enrollment)
class EnrollmentAdmin(ModelAdmin):
    list_display = (
        'id',
        'course',
        'student',
        'enrolled_at',
        'completed_at',
        'is_completed',
        'certificate_issued',
        'certificate_url',
    )
    list_filter = (
        'course',
        'student',
        'enrolled_at',
        'completed_at',
        'is_completed',
        'certificate_issued',
    )


@admin.register(LessonProgress)
class LessonProgressAdmin(ModelAdmin):
    list_display = (
        'id',
        'enrollment',
        'lesson',
        'is_completed',
        'completed_at',
        'time_spent',
    )
    list_filter = ('enrollment', 'lesson', 'is_completed', 'completed_at')


@admin.register(CourseReview)
class CourseReviewAdmin(ModelAdmin):
    list_display = (
        'id',
        'course',
        'student',
        'rating',
        'comment',
        'created_at',
        'updated_at',
    )
    list_filter = ('course', 'student', 'created_at', 'updated_at')
    date_hierarchy = 'created_at'


@admin.register(CourseComment)
class CourseCommentAdmin(ModelAdmin):
    list_display = (
        'id',
        'lesson',
        'author',
        'parent',
        'content',
        'created_at',
        'updated_at',
    )
    list_filter = ('lesson', 'author', 'parent', 'created_at', 'updated_at')
    date_hierarchy = 'created_at'


@admin.register(Subtopic)
class SubtopicAdmin(ModelAdmin):
    list_display = ('id', 'lesson', 'title', 'description', 'order')
    list_filter = ('lesson',)


@admin.register(StudyTypeContent)
class StudyTypeContentAdmin(ModelAdmin):
    list_display = (
        'id',
        'lesson',
        'content_type',
        'title',
        'content',
        'url',
        'order',
    )
    list_filter = ('lesson',)


@admin.register(ChapterContentSlide)
class ChapterContentSlideAdmin(ModelAdmin):
    list_display = (
        'id',
        'lesson',
        'order',
        'title',
        'content',
        'image_url',
        'audio_url',
    )
    list_filter = ('lesson',)


@admin.register(DiscussionRoom)
class DiscussionRoomAdmin(ModelAdmin):
    list_display = ('id', 'course', 'name', 'description', 'created_at')
    list_filter = ('course', 'created_at')
    search_fields = ('name',)
    date_hierarchy = 'created_at'