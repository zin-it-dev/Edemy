import zoneinfo
from django.utils import timezone
from clerk_backend_api import AuthenticateRequestOptions, Clerk, authenticate_request
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.hashers import check_password, make_password
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from accounts.models import User


class SettingsBackend(BaseBackend):
    """
    Authenticate against the settings ADMINS and PASSWORD.

    Use the login emails and a hash of the password.
    """

    admins = dict((email, name) for name, email in settings.ADMINS)

    def authenticate(self, request, username=None, password=None):
        login_valid = username in self.admins
        pwd_valid = check_password(password, make_password("Edemy@123"))
        if login_valid and pwd_valid:
            try:
                user = User.objects.get(email=username)
            except User.DoesNotExist:
                full_name = self.admins[username].strip()

                if " " in full_name:
                    first_name, last_name = full_name.split(" ", 1)
                else:
                    first_name = full_name
                    last_name = ""

                user = User(
                    email=username,
                    username=full_name.lower().replace(" ", ""),
                    first_name=first_name,
                    last_name=last_name,
                )
                user.role = User.Role.ADMIN
                user.is_staff = True
                user.is_superuser = True
                user.save()
            return user
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

    def has_perm(self, user_obj, perm, obj=None):
        return user_obj.email in self.admins


class ClerkAuthentication(BaseAuthentication):
    def authenticate(self, request):
        User = get_user_model()

        if "Authorization" not in request.headers:
            return None

        try:
            request_state = authenticate_request(
                request,
                AuthenticateRequestOptions(secret_key=settings.CLERK_SECRET_KEY),
            )

            if not request_state.is_signed_in:
                raise AuthenticationFailed(
                    f"Authentication failed!: {str(request_state.message)}"
                )

            with Clerk(bearer_auth=settings.CLERK_SECRET_KEY) as clerk:
                data = clerk.users.get(
                    user_id=request_state.payload["sub"],
                )
                email = next(
                    (
                        email
                        for email in data.email_addresses
                        if email.id == data.primary_email_address_id
                    ),
                    None,
                )

            user, _ = User.objects.get_or_create(
                clerk_id=request_state.payload["sub"],
                defaults={
                    "email": email.email_address,
                    "username": email.email_address,
                    "first_name": data.first_name,
                    "last_name": data.last_name,
                    # "picture": data.image_url,
                },
            )
        except Exception as e:
            raise AuthenticationFailed(f"Token is invalid: {str(e)}")

        return (user, None)


class TimezoneMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        tzname = request.session.get("django_timezone")

        if request.user.is_authenticated:
            tzname = request.user.timezone
            request.session["django_timezone"] = tzname

        if tzname:
            timezone.activate(zoneinfo.ZoneInfo(tzname))
        else:
            timezone.deactivate()

        return self.get_response(request)
