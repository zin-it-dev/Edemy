from django.contrib import admin

from .models import Course


class CourseInline(admin.StackedInline):
    model = Course
    extra = 3


class TagInline(admin.TabularInline):
    verbose_name_plural = "tags"
    model = Course.tags.through
    extra = 3
