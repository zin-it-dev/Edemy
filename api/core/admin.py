from django.contrib import admin
from django.contrib.admin.models import LogEntry
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from django.contrib.sessions.models import Session
from django.utils.translation import gettext_lazy as _

from .forms import UserCreationForm
from .inlines import ProfileInline
from .paginators import StandardResultsSetPagination


class GenericAdminMixin:
    def __init__(self, model, admin_site):
        super().__init__(model, admin_site)
        fields = [field.name for field in model._meta.fields]
        self.list_display = fields
        self.list_per_page = StandardResultsSetPagination.page_size
        self.list_max_show_all = StandardResultsSetPagination.max_page_size
        self.prepopulated_fields = {"slug": ["name"]} if "slug" in fields else {}
        self.search_fields = ["name", "teach__full_name"]


class UserAdmin(BaseUserAdmin):
    inlines = [ProfileInline]
    date_hierarchy = "date_joined"
    add_form = UserCreationForm
    list_display = ["avatar"] + list(BaseUserAdmin.list_display)
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
    ]
    readonly_fields = ["avatar"]


# for model in [
#     m for m in apps.get_models() if not m._meta.app_config.name.startswith("silk")
# ]:
#     admin_class = None

#     if model.__name__ == "User":
#         admin_class = UserAdmin
#     elif model.__name__ not in [
#         "LogEntry",
#         "Permission",
#         "Group",
#         "ContentType",
#         "Session",
#     ]:
#         attrs = {"date_hierarchy": "date_created"}

#         if model.__name__ == "Course":
#             attrs["inlines"] = [CategoryInline, TagInline, LessonInline, CommentInline]
#             attrs["exclude"] = ["categories"]
#         elif model.__name__ == "Lesson":
#             attrs["inlines"] = [TagInline, CommentInline]

#         admin_class = type(
#             model.__name__,
#             (GenericAdminMixin, admin.ModelAdmin),
#             attrs,
#         )

#     try:
#         admin.site.register(model, admin_class)
#     except admin.sites.AlreadyRegistered:
#         pass


# admin.site.empty_value_display = _("Unknown")


def _register(model, admin_class):
    admin.site.register(model, admin_class)


from .models import *


class CourseAdmin(admin.ModelAdmin):
    list_display = ["name", "teacher"]

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if request.is_superuser:
            return queryset
        return queryset.filter(teacher=request.user)

    def save_model(self, request, obj, form, change):
        if not obj.pk and not request.user.is_superuser:
            obj.teacher = Teacher.objects.get(id=request.user.id)
        return super().save_model(request, obj, form, change)


admin.site.register(Course, CourseAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Teacher, UserAdmin)
admin.site.register(Permission)
admin.site.register(Session)
admin.site.register(LogEntry)
admin.site.register(ContentType)
