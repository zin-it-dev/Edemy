from .defaults import *

ALLOWED_HOSTS = env("DJANGO_ALLOWED_HOSTS").split(",")

CSRF_TRUSTED_ORIGINS = ["http://localhost:1337"]