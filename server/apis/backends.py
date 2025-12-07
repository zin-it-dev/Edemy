from django.conf import settings
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password

from .models import User


class SettingsBackend(BaseBackend):
    """Authenticate against the settings ADMINS and ADMIN_PASSWORD."""

    def authenticate(self, request, username=None, password=None):
        login_valid = username in settings.ADMINS
        pwd_valid = check_password(password, settings.ADMIN_PASSWORD)
        if login_valid and pwd_valid:
            try:
                user = User.objects.get(email=username)
            except User.DoesNotExist:
                user = User(email=username, username=username)
                user.is_staff = True
                user.is_superuser = True
                user.role = "ADMIN"
                user.save()
            return user
        return None

    def get_user(self, user_id):
        return User.objects.get(id=user_id)

    def has_perm(self, user_obj, perm, obj=None):
        return user_obj.email in settings.ADMINS
