from django.conf import settings
from django.db import migrations, models


def normalize_existing_emails(apps, schema_editor):
    User = apps.get_model("accounts", "User")
    seen_emails = {}

    for user in User.objects.order_by("pk").iterator():
        normalized_email = user.email.strip().casefold()
        existing_user_id = seen_emails.get(normalized_email)
        if existing_user_id is not None and existing_user_id != user.pk:
            raise RuntimeError(
                "Cannot enforce unique normalized email; duplicate emails "
                f"for users {existing_user_id} and {user.pk}: {normalized_email}"
            )
        seen_emails[normalized_email] = user.pk
        if user.email != normalized_email:
            user.email = normalized_email
            user.save(update_fields=["email"])


class Migration(migrations.Migration):
    dependencies = [
        ("accounts", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="user",
            options={
                "ordering": ["-date_joined"],
                "verbose_name": "user",
                "verbose_name_plural": "users",
            },
        ),
        migrations.AddField(
            model_name="user",
            name="clerk_id",
            field=models.CharField(
                blank=True,
                db_index=True,
                max_length=255,
                null=True,
                unique=True,
            ),
        ),
        migrations.AddField(
            model_name="user",
            name="role",
            field=models.CharField(
                choices=[
                    ("ADMIN", "Administrator"),
                    ("EDUCATOR", "Educator"),
                    ("USER", "User"),
                ],
                default="USER",
                max_length=20,
            ),
        ),
        migrations.RunPython(
            normalize_existing_emails,
            reverse_code=migrations.RunPython.noop,
        ),
        migrations.AlterField(
            model_name="user",
            name="email",
            field=models.EmailField(
                max_length=254,
                unique=True,
                verbose_name="email address",
            ),
        ),
        migrations.CreateModel(
            name="Profile",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("bio", models.CharField(blank=True, max_length=100)),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=models.deletion.CASCADE,
                        related_name="profile",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
