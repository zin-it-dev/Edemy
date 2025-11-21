from django.contrib import admin
from django.contrib.auth.models import Permission
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from import_export.admin import ImportExportModelAdmin, ExportActionMixin
from django_pdf_actions.actions import export_to_pdf_landscape, export_to_pdf_portrait

from .models import User, Comment, Course, Category
from .actions import export_as_json
from .utils import _register_site
from .forms import UserChangeForm, UserCreationForm
from .resources import CategoryResource
from .inlines import CourseInline


class UserAdmin(ExportActionMixin, BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    empty_value_display = "-Unknown-"

    actions = [export_as_json, export_to_pdf_landscape, export_to_pdf_portrait]
    list_display = list(BaseUserAdmin.list_display) + ["is_active"]
    fieldsets = (
        (None, {"fields": ("username", "email", "password")}),
        (_("Personal info"), {"fields": ("first_name", "last_name")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
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
        (_("Personal info"), {"fields": ("first_name", "last_name")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
    ]


class Administrator(ImportExportModelAdmin, ExportActionMixin, admin.ModelAdmin):
    empty_value_display = "-Unknown-"
    date_hierarchy = "date_created"
    prepopulated_fields = {"slug": ["name"]}

    actions = [export_as_json, export_to_pdf_landscape, export_to_pdf_portrait]
    list_display = ["is_active", "date_created", "date_updated"]
    list_filter = ["is_active"]
    list_per_page = 1


class CategoryAdmin(Administrator):
    resource_classes = [CategoryResource]
    inlines = [CourseInline]

    list_display = ["name"] + Administrator.list_display

    def has_view_permission(self, request, obj=None):
        return request.user.is_authenticated and (
            request.user.is_staff or request.user.is_superuser
        )


class CourseAdmin(Administrator):
    list_display = ["name"] + Administrator.list_display
    search_fields = ["name"]


admin.site.register(Permission)

_register_site(
    models=[User, Category, Course, Comment],
    admin_classes=[UserAdmin, CategoryAdmin, CourseAdmin],
)
