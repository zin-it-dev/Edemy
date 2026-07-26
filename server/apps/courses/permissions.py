from rest_framework import permissions


class IsInstructorOrAdmin(permissions.BasePermission):
    """Allow access only to the course instructor or admins."""

    def has_object_permission(self, request, view, obj):
        if request.user.is_admin_user():
            return True
        # For Course objects
        if hasattr(obj, "instructor"):
            return obj.instructor == request.user
        # For Module/Lesson objects — check parent course
        if hasattr(obj, "course"):
            return obj.course.instructor == request.user
        if hasattr(obj, "module"):
            return obj.module.course.instructor == request.user
        return False


class IsEnrolledOrFreePreview(permissions.BasePermission):
    """Allow access to enrolled students or if it's a free preview lesson."""

    def has_object_permission(self, request, view, obj):
        if request.user.is_admin_user() or request.user.is_teacher():
            return True
        # Free preview lessons are always accessible
        if hasattr(obj, "is_free_preview") and obj.is_free_preview:
            return True
        # Check enrollment
        course = None
        if hasattr(obj, "module"):
            course = obj.module.course
        elif hasattr(obj, "course"):
            course = obj.course

        if course:
            return course.enrollments.filter(student=request.user).exists()
        return False


class IsOwnerOrAdmin(permissions.BasePermission):
    """Allow access to the owner or admins (for reviews, comments)."""

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_admin_user():
            return True
        if hasattr(obj, "student"):
            return obj.student == request.user
        if hasattr(obj, "author"):
            return obj.author == request.user
        return False
