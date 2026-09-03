import inngest
from core.client import inngest_client
from django.contrib.auth import get_user_model
from accounts.services import ClerkWebhookService

User = get_user_model()


def _handle_clerk_event(ctx: inngest.Context) -> str:
    event = ctx.event
    event_name = event.name
    user_data = event.data

    clerk_id = user_data.get("id")

    if not clerk_id:
        return "Skipped: No clerk ID provided in event data."

    ctx.logger.info(f"Processing event '{event_name}' for Clerk user '{clerk_id}'")

    match event_name:
        case "clerk/user.created" | "clerk/user.updated":
            email_addresses = user_data.get("email_addresses", [])
            email = (
                email_addresses[0].get("email_address", "") if email_addresses else ""
            )

            first_name = user_data.get("first_name") or ""
            last_name = user_data.get("last_name") or ""

            username = user_data.get("username")
            if not username:
                username = email.split("@")[0] if email else f"user_{clerk_id[-6:]}"

            def upsert_user() -> dict:
                user, created = User.objects.update_or_create(
                    clerk_id=clerk_id,
                    defaults={
                        "email": email,
                        "first_name": first_name,
                        "last_name": last_name,
                        "username": username,
                        "is_active": True,
                    },
                )
                return {
                    "action": "created" if created else "updated",
                    "user_id": user.id,
                }

            result = ctx.step.run("upsert-user-in-db", upsert_user)
            return f"Successfully {result['action']} Clerk user '{clerk_id}'."

        case "clerk/user.deleted":

            def delete_user() -> dict:
                updated = User.objects.filter(clerk_id=clerk_id).update(is_active=False)
                return {"deactivated_count": updated}

            result = ctx.step.run("deactivate-user-in-db", delete_user)
            return (
                f"Processed deletion for Clerk user '{clerk_id}'. "
                f"Deactivated: {result['deactivated_count']}."
            )

        case _:
            return f"Ignored unhandled Clerk event: '{event_name}'"


@inngest_client.create_function(
    fn_id="sync-user-from-clerk",
    trigger=[inngest.TriggerEvent(event="clerk/user.*")],
)
def sync_user_from_clerk(ctx: inngest.Context) -> str:
    evt = ctx.event
    data = evt.data
    
    match evt.name:
        case "clerk/user.created" | "clerk/user.updated":
            ClerkWebhookService.handle_user_created_or_updated(data)
        case "clerk/user.deleted":
            clerk_id = data.get("id")
            if clerk_id:
                ClerkWebhookService.handle_user_deleted(clerk_id=clerk_id)
