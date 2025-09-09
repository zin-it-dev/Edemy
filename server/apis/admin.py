from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from .models import User, Category, Course
from .forms import UserChangeForm, UserCreationForm


class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = list(BaseUserAdmin.list_display) + ['picture', 'is_active', 'role']
    list_filter = list(BaseUserAdmin.list_filter) + ['role']
    readonly_fields = ['picture']
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


class ModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'is_active']
    list_filter = ['is_active']
    date_hierarchy = 'date_created'


class CategoryAdmin(ModelAdmin):
    list_display = ModelAdmin.list_display + ['name']


class CourseAdmin(ModelAdmin):
    list_display = ModelAdmin.list_display + ['name']


admin.site.register(User, UserAdmin)
admin.site.register(Category)
admin.site.register(Course)