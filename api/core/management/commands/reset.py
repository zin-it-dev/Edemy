from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Reset database and reload fixtures"

    def add_arguments(self, parser):
        parser.add_argument(
            "--no-input", action="store_true", help="Skip confirmation prompts"
        )

    def handle(self, *args, **options):
        if not options["no_input"]:
            confirm = input("This will delete all data. Continue? [y/N] ")
            if confirm.lower() != "y":
                self.stdout.write("Aborted.")
                return

        self.stdout.write("Flushing database...")
        call_command("flush", "--no-input")

        self.stdout.write("Running migrations...")
        call_command("migrate", verbosity=options["verbosity"])

        self.stdout.write("Loading fixtures...")
        call_command("loaddata", "initial_data.json")

        self.stdout.write(self.style.SUCCESS("Reset complete"))
