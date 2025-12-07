from django.conf import settings
from rest_framework import authentication
from rest_framework.exceptions import AuthenticationFailed
from clerk_backend_api import Clerk, AuthenticateRequestOptions, authenticate_request
from django.contrib.auth import get_user_model


class ClerkAuthentication(authentication.BaseAuthentication):
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
                return None

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
                    "picture": data.image_url,
                },
            )

        except Exception as e:
            raise AuthenticationFailed(f"Token is invalid: {str(e)}")
            return None

        return (user, None)
