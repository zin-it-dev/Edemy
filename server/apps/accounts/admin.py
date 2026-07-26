from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from unfold.admin import ModelAdmin
from unfold.forms import AdminPasswordChangeForm, UserChangeForm, UserCreationForm
from accounts.models import User, Profile, UserActivity, Trophy, UserTrophy, Teacher, Student


@admin.register(User)
class UserAdmin(BaseUserAdmin, ModelAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    change_password_form = AdminPasswordChangeForm
    list_display = (
        "password",
        "last_login",
        "is_superuser",
        "username",
        "first_name",
        "last_name",
        "is_staff",
        "is_active",
        "date_joined",
        "id",
        "clerk_id",
        "email",
        "role",
        "bio",
        "picture",
        "credits",
        "timezone",
    )
    list_filter = (
        "last_login",
        "is_superuser",
        "is_staff",
        "is_active",
        "date_joined",
    )
    raw_id_fields = ("groups", "user_permissions")


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = (
        "created",
        "modified",
        "is_removed",
        "id",
        "user",
        "avatar",
        "is_premium_member",
        "xp",
        "coins",
        "level",
        "points",
        "daily_streak",
        "longest_streak",
        "customer_id",
    )
    list_filter = (
        "created",
        "modified",
        "is_removed",
        "user",
        "is_premium_member",
    )
    raw_id_fields = ("trophies",)


@admin.register(UserActivity)
class UserActivityAdmin(admin.ModelAdmin):
    list_display = (
        "created",
        "modified",
        "is_removed",
        "id",
        "profile",
        "activity_type",
        "xp_earned",
        "coins_earned",
        "points_earned",
        "description",
    )
    list_filter = ("created", "modified", "is_removed", "profile")


@admin.register(Trophy)
class TrophyAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "description",
        "icon",
        "requirement_type",
        "requirement_value",
        "xp_reward",
        "coin_reward",
    )
    search_fields = ("name",)


@admin.register(UserTrophy)
class UserTrophyAdmin(admin.ModelAdmin):
    list_display = (
        "created",
        "modified",
        "is_removed",
        "id",
        "profile",
        "trophy",
    )
    list_filter = ("created", "modified", "is_removed", "profile", "trophy")


@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = (
        "password",
        "last_login",
        "is_superuser",
        "username",
        "first_name",
        "last_name",
        "is_staff",
        "is_active",
        "date_joined",
        "id",
        "clerk_id",
        "email",
        "role",
        "bio",
        "picture",
        "credits",
        "timezone",
    )
    list_filter = (
        "last_login",
        "is_superuser",
        "is_staff",
        "is_active",
        "date_joined",
    )


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = (
        "password",
        "last_login",
        "is_superuser",
        "username",
        "first_name",
        "last_name",
        "is_staff",
        "is_active",
        "date_joined",
        "id",
        "clerk_id",
        "email",
        "role",
        "bio",
        "picture",
        "credits",
        "timezone",
    )
    list_filter = (
        "last_login",
        "is_superuser",
        "is_staff",
        "is_active",
        "date_joined",
    )
