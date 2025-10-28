import requests 

from django.core.management.base import BaseCommand, CommandError
from django.conf import settings

from apis.models import Course, User, Category

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
                response.raise_for_status()
                data = response.json()
            except Exception as e:
                raise CommandError(f"API request failed: {e}")
            
            courses = data.get("courses", [])
            for course in courses:
                category = course.get("category")
                
                if category:
                    _, created = Category.objects.get_or_create(
                        name=category
                    )
                    if created:
                        self.stdout.write(self.style.SUCCESS(f'Category: {category}'))
                
                Course.objects.create(
                    name=course.get("name"),
                    description=course.get("description"),
                    user=staff,
                    category=_
                )
                self.stdout.write(self.style.SUCCESS(f'Course: {course.get("name")}'))