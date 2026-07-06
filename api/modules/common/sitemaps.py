from authentication.models import User
from django.contrib.sitemaps import Sitemap


class CourseSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.8

    def items(self):
        return User.objects.filter(is_active=True)

    def location(self, item):
        return f"/courses/{item.slug}"
