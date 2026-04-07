from django.contrib import admin
from django.contrib.auth.models import Permission

from common.admin import GenericAdministrator
from common.utils import _register_site

from .inlines import CommentInline, CourseInline, LessonInline
from .models import Category, Comment, Course, Lesson
from .resources import CategoryResource


class CategoryAdmin(GenericAdministrator):
    resource_classes = [CategoryResource]
    inlines = [CourseInline]

    prepopulated_fields = {"slug": ["name"]}
    list_display = ["name", *GenericAdministrator.list_display]


class CourseAdmin(GenericAdministrator):
    inlines = [LessonInline, CommentInline]

    prepopulated_fields = {"slug": ["name"]}
    list_display = ["name", "category", *GenericAdministrator.list_display]
    search_fields = ["name"]
    list_filter = ["category__name", *GenericAdministrator.list_filter]
    readonly_fields = GenericAdministrator.readonly_fields


class LessonAdmin(GenericAdministrator):
    prepopulated_fields = {"slug": ["name"]}
    list_display = ["name", "course", *GenericAdministrator.list_display]
    search_fields = ["name"]
    list_filter = ["course__name", *GenericAdministrator.list_filter]
    readonly_fields = GenericAdministrator.readonly_fields


class CommentAdmin(GenericAdministrator):
    list_display = ["creator", "course", "content", *GenericAdministrator.list_display]


admin.site.register(Permission)

_register_site(
    models=[Category, Course, Comment, Lesson],
    admin_classes=[CategoryAdmin, CourseAdmin, CommentAdmin, LessonAdmin],
)