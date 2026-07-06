from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from .forms import UserCreationForm
from .models import Profile, Student, Teacher, User


class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = _("profile")


@admin.register(User, Teacher, Student)
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
