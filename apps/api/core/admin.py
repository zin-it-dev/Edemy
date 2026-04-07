from django.contrib.admin import AdminSite as BaseAdminSite


class AdminSite(BaseAdminSite):
    def get_urls(self):
        urls = super().get_urls()
        return urls