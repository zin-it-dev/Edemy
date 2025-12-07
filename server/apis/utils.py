import random, hashlib

from django.contrib import admin
from typing import Tuple, List
from urllib.parse import urlencode

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
    """Util function get dict year."""
    return {month: 0 for month in MONTHS}


def _register_site(models, admin_classes):
    """Util function register admin site."""
    for model, admin_class in zip(models, admin_classes):
        try:
            admin.site.register(model, admin_class)
        except admin.sites.AlreadyRegistered:
            pass


def generate_colors(num_providers: int) -> List[Tuple[int, int, int]]:
    """Util function random colors."""
    return [
        (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
        for _ in range(num_providers)
    ]


def decode_avatar(email="admin@gmail.com", size=40, default="robohash"):
    email_encoded = email.lower().encode("utf-8")
    email_hash = hashlib.sha256(email_encoded).hexdigest()
    params = urlencode({"d": default, "s": str(size)})
    return f"https://www.gravatar.com/avatar/{email_hash}?{params}"
