import random

from django.contrib import admin
from typing import Tuple, List

MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]


def get_year():
    return {month: 0 for month in MONTHS}


def _register_site(models, admin_classes):
    for model, admin_class in zip(models, admin_classes):
        try:
            admin.site.register(model, admin_class)
        except admin.sites.AlreadyRegistered:
            pass


def generate_colors(num_providers: int) -> List[Tuple[int, int, int]]:
    return [
        (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
        for _ in range(num_providers)
    ]
