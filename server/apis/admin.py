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
from .inlines import CourseInline, CommentInline, LessonInline
from .paginatiors import LargeResultsSetPagination


class GenericAdmin(ImportExportModelAdmin, ExportActionMixin):
    empty_value_display = "-Unknown-"

    actions = [export_as_json, export_to_pdf_landscape, export_to_pdf_portrait]
    list_per_page = LargeResultsSetPagination.page_size


class UserAdmin(GenericAdmin, BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    date_hierarchy = "date_joined"
    list_display = ["clerk_id", "avatar"] + list(BaseUserAdmin.list_display) + ["is_active", "role"]
    list_filter = list(BaseUserAdmin.list_filter) + ["is_active", "role"]
    list_editable = ["is_active"]
    readonly_fields = ["avatar"]
    fieldsets = (
        (None, {"fields": ("username", "email", "password")}),
        (
            _("Personal info"),
            {"fields": ("first_name", "last_name", "picture", "avatar")},
        ),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "role",
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
        (_("Personal info"), {"fields": ("first_name", "last_name", "picture")}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "role",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
    ]


class Administrator(GenericAdmin, admin.ModelAdmin):
    readonly_fields = ["created", "modified"]

    list_display = ["is_removed", "created", "modified"]
    list_filter = ["is_removed"]
    list_editable = ["is_removed"]
    list_per_page = LargeResultsSetPagination.page_size


class CategoryAdmin(Administrator):
    resource_classes = [CategoryResource]
    inlines = [CourseInline]

    prepopulated_fields = {"slug": ["name"]}
    list_display = ["name"] + Administrator.list_display


class CourseAdmin(Administrator):
    inlines = [LessonInline, CommentInline]

    prepopulated_fields = {"slug": ["name"]}
    list_display = [
        "name",
        "headshot_thumbnail",
        "category",
    ] + Administrator.list_display
    search_fields = ["name"]
    list_filter = ["category__name"] + Administrator.list_filter
    readonly_fields = Administrator.readonly_fields + ["headshot_thumbnail"]


class CommentAdmin(Administrator):
    list_display = ["creator", "course", "content"] + Administrator.list_display


admin.site.register(Permission)

_register_site(
    models=[User, Category, Course, Comment],
    admin_classes=[UserAdmin, CategoryAdmin, CourseAdmin, CommentAdmin],
)
