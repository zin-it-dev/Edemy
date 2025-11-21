from django.contrib import admin

from .models import Course


class CourseInline(admin.StackedInline):
    model = Course
    extra = 3
