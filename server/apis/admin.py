from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from import_export.admin import ImportExportModelAdmin, ExportActionMixin
from django_pdf_actions.actions import export_to_pdf_landscape, export_to_pdf_portrait
from django.contrib.auth.models import Permission

from .models import Course, Module, Lesson, User, Category
from .forms import UserChangeForm, UserCreationForm
from .resources import CategoryResource


class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    
    list_display = ['avatar'] + list(BaseUserAdmin.list_display) + ['is_active', 'role']
    list_filter = list(BaseUserAdmin.list_filter) + ['role']
    readonly_fields = ['avatar']
    fieldsets = (
        (None, {"fields": ("username", "email", "password")}),
        (_("Personal info"), {"fields": ("first_name", "last_name", "picture", "avatar")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                    "role"
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "username", "password1", "password2"],
            },
        ),
        (_("Personal info"), {"fields": ("first_name", "last_name", "picture")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                    "role"
                ),
            },
        ),
    ]


class ModelAdmin(ImportExportModelAdmin, ExportActionMixin, admin.ModelAdmin):
    actions = [export_to_pdf_landscape, export_to_pdf_portrait]
    prepopulated_fields = {'slug': ['name']}
    list_display = ['is_active', 'created_on', 'changed_on']
    list_filter = ['is_active']
    date_hierarchy = 'created_on'


class CategoryAdmin(ModelAdmin):
    resource_classes = [CategoryResource]
    list_display = ['name'] + ModelAdmin.list_display


class CourseAdmin(ModelAdmin):
    list_display = ['name'] + ModelAdmin.list_display


class LessonAdmin(ModelAdmin):
    list_display = ['name'] + ModelAdmin.list_display


admin.site.register(Permission)
admin.site.register(User, UserAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Module)
admin.site.register(Lesson, LessonAdmin)