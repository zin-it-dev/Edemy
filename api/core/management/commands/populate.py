from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Populates the database with initial data"

    def handle(self, *args, **options):
        self.stdout.write("Loading fixtures...")
        call_command("loaddata", "initial_data.json")
        self.stdout.write(self.style.SUCCESS("Database populate: OK"))
