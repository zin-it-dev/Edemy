from django.contrib import admin
from django.contrib.auth.models import Permission
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from import_export.admin import ImportExportModelAdmin, ExportActionMixin
from django_pdf_actions.actions import export_to_pdf_landscape, export_to_pdf_portrait

from .models import User, Comment, Course, Category, Tag
from .actions import export_as_json
from .utils import _register_site
from .forms import UserChangeForm, UserCreationForm
from .resources import CategoryResource
from .inlines import CourseInline, TagInline
from .paginatiors import LargeResultsSetPagination


class GenericAdmin(ImportExportModelAdmin, ExportActionMixin):
    empty_value_display = "-Unknown-"

    actions = [export_as_json, export_to_pdf_landscape, export_to_pdf_portrait]
    list_display = ["is_active"]
    list_filter = ["is_active"]
    list_editable = ["is_active"]
    list_per_page = LargeResultsSetPagination.page_size


class UserAdmin(GenericAdmin, BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    date_hierarchy = "date_joined"
    list_display = list(BaseUserAdmin.list_display) + GenericAdmin.list_display
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


class Administrator(GenericAdmin, admin.ModelAdmin):
    prepopulated_fields = {"slug": ["name"]}

    readonly_fields = ["date_created", "date_updated"]
    list_display = GenericAdmin.list_display + ["date_created", "date_updated"]
    list_per_page = LargeResultsSetPagination.page_size


class CategoryAdmin(Administrator):
    resource_classes = [CategoryResource]
    inlines = [CourseInline]

    list_display = ["name"] + Administrator.list_display


class CourseAdmin(Administrator):
    inlines = [TagInline]

    list_display = ["name", "category"] + Administrator.list_display
    search_fields = ["name"]
    list_filter = ["category__name"] + Administrator.list_filter
    filter_horizontal = ["tags"]


class TagAdmin(Administrator):
    prepopulated_fields = {}
    
    list_display = ["name"] + Administrator.list_display


admin.site.register(Permission)

_register_site(
    models=[User, Category, Course, Tag, Comment],
    admin_classes=[UserAdmin, CategoryAdmin, CourseAdmin, TagAdmin],
)
