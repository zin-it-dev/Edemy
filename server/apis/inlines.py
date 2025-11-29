from django.contrib import admin

from .models import Course, Comment


class CourseInline(admin.StackedInline):
    model = Course
    extra = 3


class CommentInline(admin.StackedInline):
    model = Comment
    extra = 3
