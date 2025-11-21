import requests

from django.core.management.base import BaseCommand, CommandError
from django.conf import settings

from apis.models import Category
from apis.tests.factories import CategoryFactory


class Command(BaseCommand):
    help = "Generates sample data using factory_boy."

    def add_arguments(self, parser):
        parser.add_argument(
            "--quantity",
            type=int,
            default=10,
            help="Number of objects to create.",
        )

    def handle(self, *args, **options):
        if settings.DEBUG:
            quantity = options["quantity"]
            CategoryFactory.create_batch(quantity)
            self.stdout.write(
                self.style.SUCCESS(f"Successfully created {quantity} Category objects.")
            )
        else:
            for page in options["quantity"]:
                self.stdout.write(f"PROCESSING fetch page {page}...")

                querystring = {"page": str(page), "page_size": "10"}

                try:
                    response = requests.get(
                        settings.RAPIDAPI_URL,
                        headers=settings.RAPIDAPI_HEADERS,
                        params=querystring,
                    )
                    response.raise_for_status()
                    data = response.json()
                except Exception as e:
                    raise CommandError(f"API request failed: {e}")
