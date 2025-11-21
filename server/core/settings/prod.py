from .base import *

# Email

ADMINS = [("ZIN", "zin.it.dev@gmail.com")]

SERVER_EMAIL = "edemymaster@logs.com"

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

EMAIL_USE_TLS = True

EMAIL_HOST_USER = os.environ.get("EMAIL_USER")
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_PASSWORD")

# LOGGING

LOG_ROOT = os.path.join(BASE_DIR, "logs")

LOGGING = {
    "version": 1,
    "handlers": {
        "file": {
            "class": "logging.FileHandler",
            "filename": os.path.join(LOG_ROOT, "general.log"),
            "formatter": "verbose",
        },
        "mail_admins": {
            "level": "ERROR",
            "class": "django.utils.log.AdminEmailHandler",
            "include_html": True,
        },
    },
    "loggers": {
        "django.request": {
            "handlers": ["mail_admins", "file"],
            "level": "ERROR",
            "propagate": False,
        },
        "django.db.backends": {"level": "INFO", "handlers": ["mail_admins", "file"]},
        "import_export": {
            "handlers": ["mail_admins", "file"],
            "level": "INFO",
        },
    },
    "formatters": {
        "verbose": {
            "format": "{name} {levelname} {asctime} {module} {process:d} {thread:d} {message}",
            "style": "{",
        },
        "simple": {
            "format": "{levelname} {message}",
            "style": "{",
        },
    },
}

# RAPIDAPI
RAPIDAPI_URL = (
    "https://udemy-paid-courses-for-free-api.p.rapidapi.com/rapidapi/courses/"
)

RAPIDAPI_HEADERS = {
    "x-rapidapi-key": os.environ.get("RAPIDAPI_KEY"),
    "x-rapidapi-host": os.environ.get("RAPIDAPI_HOST"),
}
