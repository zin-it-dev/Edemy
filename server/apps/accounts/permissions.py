from rest_framework.permissions import BasePermission


def has_clerk_permission(permission: str):
    class _ClerkPermission(BasePermission):
        def has_permission(self, request, view):
            state = request.auth
            if state is None:
                return False
            org_permissions = state.payload.get("org_permissions") or []
            return permission in org_permissions

    return _ClerkPermission
