from django.contrib import admin
from accounts.models import User


class AdminRequiredMixin:
    """Mixin to require admin role."""

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated or not request.user.is_admin:
            from django.core.exceptions import PermissionDenied

            raise PermissionDenied
        return super().dispatch(request, *args, **kwargs)


class UserAdmin(admin.ModelAdmin):
    list_display = ["email", "username", "role", "tier", "avatar"]
    readonly_fields = ["avatar"]


admin.site.register(User, UserAdmin)
