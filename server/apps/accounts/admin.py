from django.contrib import admin
from accounts.models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ["email", "username", "role", "tier", "avatar"]
    readonly_fields = ["avatar"]


admin.site.register(User, UserAdmin)
