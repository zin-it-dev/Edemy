import inngest, enum
from common.client import inngest_client
from accounts.models import User


class ClerkWebhookEvent(enum.Enum):
    USER_CREATED = "clerk/user.created"
    USER_DELETED = "clerk/user.deleted"
    USER_UPDATED = "clerk/user.updated"


@inngest_client.create_function(
    fn_id="resync-user-data",
    trigger=inngest.TriggerEvent(event="clerk/user.*")
)
def sync_user(ctx: inngest.ContextSync) -> str:
    event = ctx.event
    data = event.data
    clerk_id = data.get("id")

    match event.name:
        case (
            ClerkWebhookEvent.USER_CREATED.value | ClerkWebhookEvent.USER_UPDATED.value
        ):
            email = (data.get("email_addresses") or [{}])[0].get("email_address")
            user, created = User.objects.update_or_create(
                clerk_id=clerk_id,
                defaults={
                    "username": email,
                    "email": email,
                    "first_name": data.get("first_name"),
                    "last_name": data.get("last_name"),
                }
            )
            action = "Create new" if created else "Update"
            ctx.logger.info(
                f"Successfully {action.lower()}d profile for Clerk ID: {clerk_id}"
            )
        case ClerkWebhookEvent.USER_DELETED.value:
            User.objects.filter(clerk_id=clerk_id).delete()
            ctx.logger.info(f"Successfully deleted user with Clerk ID: {clerk_id}")
        case _:
            ctx.logger.info(f"Unhandled event type: ${event.name}")
            
            