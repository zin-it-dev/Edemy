from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline
from django.utils.translation import gettext_lazy as _

from .models import Choice, Comment, Course, Lesson, Profile, Question, Tag


class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = _("profile")
    fk_name = "user"


class LessonInline(admin.StackedInline):
    model = Lesson
    extra = 4
    prepopulated_fields = {"slug": ["name"]}


class TagInline(GenericTabularInline):
    model = Tag
    extra = 3


class CommentInline(GenericTabularInline):
    model = Comment
    extra = 1


class CategoryInline(admin.StackedInline):
    model = Course.categories.through
    extra = 3
    verbose_name_plural = _("categories")


class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 4


class QuestionInline(admin.StackedInline):
    model = Question
    extra = 1
    show_change_link = True
