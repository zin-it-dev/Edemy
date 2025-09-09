from django.core.management.base import BaseCommand
from django.core.management import call_command


class Command(BaseCommand):
    help = 'Seed data from JSON'
    
    def handle(self, *args, **options):
        call_command("loaddata", "db_category.json")
        call_command("loaddata", "db_course.json")