import secrets

import inngest
from common.client import inngest_client

from .models import User


@inngest_client.create_function(
    fn_id="resync-user-data",
    trigger=[
        inngest.TriggerEvent(event="clerk/user.*"),
        inngest.TriggerCron(cron="0 5 * * *"),
    ],
)
async def sync_user(ctx: inngest.Context):
    try:
        event_id, event_name, data = ctx.event.id, ctx.event.name, ctx.event.data
        id, email = data["id"], data["email_addresses"][0]["email_address"]
        username = data["username"] or "-".join(
            [email.split("@")[0], secrets.token_urlsafe(4)]
        )

        user_data = {
            "email": email,
            "username": username,
            "first_name": data["first_name"],
            "last_name": data["last_name"],
            "picture": data["image_url"],
        }

        ctx.logger.info(f"Processing webhook {event_id} {event_name} {id}")

        match event_name:
            case "clerk/user.created":
                await User.objects.aget_or_create(clerk_id=id, defaults=user_data)
            case "clerk/user.updated":
                await User.objects.aupdate_or_create(clerk_id=id, defaults=user_data)
            case "clerk/user.deleted":
                await User.objects.filter(clerk_id=id).aupdate(is_active=False)
            case _:
                ctx.logger.info(f"Unhandled event type: {event_name}")
                return {"unhandled": True, "event": event_name}

        ctx.logger.info(f"Successfully processed webhook {event_id} {event_name} {id}")
        return {"success": True, "status": 201}
    except Exception as e:
        ctx.logger.error(f"Processing failed: {str(e)}")
        return {"error": str(e), "status": 500}

    # customer = await ctx.step.run(
    #     'create-customer',
    # )
    # await ctx.step.run('create-subscription')
