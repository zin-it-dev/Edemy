from .defaults import *

ALLOWED_HOSTS = env("DJANGO_ALLOWED_HOSTS").split(",")

CSRF_TRUSTED_ORIGINS = ["http://localhost:1337"]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]

CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^https://.*\.vercel\.app$",
]
