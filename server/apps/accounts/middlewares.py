import logging
from clerk_backend_api import AuthenticateRequestOptions, authenticate_request
from clerk_backend_api.security.types import AuthErrorReason
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.core.exceptions import ObjectDoesNotExist

logger = logging.getLogger(__name__)
User = get_user_model()


class ClerkAuthentication(BaseAuthentication):
    def authenticate(self, request):
        if "HTTP_AUTHORIZATION" not in request.META:
            return None

        try:
            state = authenticate_request(
                request,
                AuthenticateRequestOptions(
                    secret_key=settings.CLERK_SECRET_KEY,
                    jwt_key=settings.CLERK_JWT_KEY,
                    authorized_parties=settings.CLERK_AUTHORIZED_PARTIES,
                    accepts_token=["session_token"],
                ),
            )
        except Exception as e:
            logger.error(f"Error authenticating Clerk request: {str(e)}")
            raise AuthenticationFailed("Failed to verify authentication token.")

        if not state.is_signed_in:
            if state.reason is AuthErrorReason.SESSION_TOKEN_MISSING:
                return None
            raise AuthenticationFailed(
                state.reason.name.lower() if state.reason else "unauthorized"
            )

        clerk_id = state.payload.get("sub")
        if not clerk_id:
            raise AuthenticationFailed("User identifier (sub) missing in token.")

        try:
            user = User.objects.get(username=clerk_id)
        except ObjectDoesNotExist:
            raise AuthenticationFailed("No such user")

        if not user.is_active:
            raise AuthenticationFailed("User account is disabled.")

        return (user, state)

    def authenticate_header(self, request):
        return "Bearer"
