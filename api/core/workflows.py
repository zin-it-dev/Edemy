import inngest

from .client import inngest_client
from .models import User


@inngest_client.create_function(
    fn_id="sync-clerk-user",
    trigger=inngest.TriggerEvent(event="clerk/user.created"),
)
def sync_user(ctx: inngest.ContextSync):
    user = ctx.event.data

    id, username, first_name, last_name, picture, email_addresses, primary_email_id = (
        user.get("id"),
        user.get("username"),
        user.get("first_name"),
        user.get("last_name"),
        user.get("image_url"),
        user.get("email_addresses", []),
        user.get("primary_email_address_id"),
    )

    emails = next((e for e in email_addresses if e.get("id") == primary_email_id), None)
    email = emails.get("email_address", "") if emails else ""

    if not username and email:
        username = email.split("@")

    User.objects.update_or_create(
        clerk_id=id,
        defaults={
            "email": email,
            "username": username,
            "first_name": first_name,
            "last_name": last_name,
            "picture": picture,
        },
    )
