from django.contrib import admin

MONTHS = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
]


def get_year():
    return {month: 0 for month in MONTHS}


def _register_site(models, admin_classes):
    for model, admin_class in zip(models, admin_classes):
        try:
            admin.site.register(model, admin_class)
        except admin.sites.AlreadyRegistered:
            pass
