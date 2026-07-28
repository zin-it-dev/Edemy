from accounts.models import User
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Permission
from django.utils.translation import gettext_lazy as _


class UserAdmin(BaseUserAdmin):
    list_display = list(BaseUserAdmin.list_display)
    # list_filter = [""]
    # search_fields = ["email"]
    # ordering = ["email"]
    # filter_horizontal = []
    # fieldsets = (
    #     (None, {"fields": ("username", "email", "password")}),
    #     (_("Personal info"), {"fields": ("first_name", "last_name")}),
    #     (
    #         _("Permissions"),
    #         {
    #             "fields": (
    #                 "is_active",
    #                 "is_staff",
    #                 "is_superuser",
    #                 "groups",
    #                 "user_permissions"
    #             ),
    #         },
    #     ),
    #     (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    # )
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": [
                    "email",
                    "username",
                    "usable_password",
                    "password1",
                    "password2",
                ],
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


admin.site.register(User, UserAdmin)
admin.site.register(Permission)
