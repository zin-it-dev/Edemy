import requests 

from django.core.management.base import BaseCommand, CommandError
from django.utils.text import slugify
from django.conf import settings
from unidecode import unidecode

from apis.models import Course, User

class Command(BaseCommand):
    help = "Calls a third-party API and processes the response."

    def add_arguments(self, parser):
        parser.add_argument(
            "amount",
            nargs=1,
            type=int,
            help="The amount of data pages to fetch from the API.",
        )

    def handle(self, *args, **options):
        api_url = (
            "https://udemy-paid-courses-for-free-api.p.rapidapi.com/rapidapi/courses/"
        )
        
        try:
            staff = User.objects.filter(is_staff=True).first()
        except User.DoesNotExist:
            raise CommandError('Staff does not exist')

        for page in options["amount"]:
            self.stdout.write(f"PROCESSING fetch page {page}...")
            
            querystring = {"page": str(page), "page_size": "10"}
            
            try:
                response = requests.get(api_url, headers=settings.RAPIDAPI_HEADERS, params=querystring)
                data = response.json()
            except Exception as e:
                raise CommandError(f"API request failed: {e}")
            
            courses = data.get("courses", [])
            for course in courses:
                Course.objects.create(
                    slug=slugify(unidecode(course.get("name"))),
                    name=course.get("name"),
                    description=course.get("description"),
                    user=staff,
                )
                self.stdout.write(self.style.SUCCESS(f'Course: {course.get("name")}'))