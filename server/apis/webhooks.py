from django.conf import settings
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import ValidationError
from svix import Webhook, WebhookVerificationError

from .models import ClerkWebhookEvent, User


class ClerkWebhookAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        headers = request.headers
        payload = request.body

        try:
            wh = Webhook(settings.CLERK_WEBHOOK_SIGNING_SECRET)
            evt = wh.verify(payload, headers)

            if evt["type"] in [
                ClerkWebhookEvent.USER_CREATED.value,
                ClerkWebhookEvent.USER_UPDATED.value,
                ClerkWebhookEvent.USER_DELETED.value,
            ]:
                User.handle_clerk_webhook(evt)

            return Response(status=status.HTTP_200_OK)
        except WebhookVerificationError as e:
            raise ValidationError(
                {"detail": "Invalid webhook signature"},
                code=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            raise e
