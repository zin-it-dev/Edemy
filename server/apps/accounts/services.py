from functools import lru_cache

from clerk_backend_api import Clerk
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import transaction

User = get_user_model()


@lru_cache
def get_clerk() -> Clerk:
    return Clerk(bearer_auth=settings.CLERK_SECRET_KEY)


class ClerkWebhookService:
    @classmethod
    def handle_user_created_or_updated(cls, data: dict):
        email = next(
            (
                address.get("email_address")
                for address in data.get("email_addresses") or []
                if address.get("id") == data.get("primary_email_address_id")
            ),
            None,
        )
        
        avatar = data.get("image_url") or data.get("profile_image_url")

        defaults = {
            "email": email,
            "username": data.get("username") or "",
            "first_name": data.get("first_name") or "",
            "last_name": data.get("last_name") or "",
            "picture": avatar
        }

        with transaction.atomic():
            user, created = User.objects.get_or_create(
                clerk_id=data["id"], defaults=defaults
            )
            if not created:
                for key, value in defaults.items():
                    setattr(user, key, value)
                user.save()
            return user

    @classmethod
    def handle_user_deleted(cls, clerk_id: str):
        with transaction.atomic():
            User.objects.filter(clerk_id=clerk_id).delete()
