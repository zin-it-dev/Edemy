from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import Course, Module, Lesson, User

class UserAdmin(BaseUserAdmin):
    list_display = ['avatar'] + list(BaseUserAdmin.list_display) + ['is_active', 'role']


admin.site.register(User, UserAdmin)
admin.site.register(Course)
admin.site.register(Module)
admin.site.register(Lesson)