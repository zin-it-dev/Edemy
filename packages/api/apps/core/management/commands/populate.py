from django.core.management.base import BaseCommand
from content.models import *

class Command(BaseCommand):
    help = 'Seeds the database with sample authors and books'