from .base import *

ALLOWED_HOSTS = ["*"]

INSTALLED_APPS += ["debug_toolbar", "silk"]

MIDDLEWARE += [
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    "silk.middleware.SilkyMiddleware",
]

INTERNAL_IPS = [
    "127.0.0.1",
]

STATIC_ROOT = os.path.join(BASE_DIR.parent, "static")

# Debug Toolbar
# See https://django-debug-toolbar.readthedocs.io/en/latest/installation.html

DEBUG_TOOLBAR_CONFIG = {
    "SHOW_TOOLBAR_CALLBACK": lambda request: True,
    "INTERCEPT_REDIRECTS": False,
}

# CORS
# https://github.com/adamchainz/django-cors-headers

CORS_ALLOW_ALL_ORIGINS = True

LOGGING = {
    "version": 1,
    "handlers": {
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
        },
    },
    "loggers": {
        "django.db.backends": {
            "handlers": ["console"],
            "level": "ERROR",
            "propagate": False,
        },
    },
}

# Elasticsearch
# https://django-elasticsearch-dsl.readthedocs.io/en/latest/settings.html

ELASTICSEARCH_DSL_INDEX_SETTINGS = {
    "number_of_shards": 1,
    "number_of_replicas": 0,
}
