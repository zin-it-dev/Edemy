from django.core.management.base import BaseCommand, CommandError

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
        quantity = options['quantity']
        CategoryFactory.create_batch(quantity)
        self.stdout.write(self.style.SUCCESS(f'Successfully created {quantity} Category objects.'))
