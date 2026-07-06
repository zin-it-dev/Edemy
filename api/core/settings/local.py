import socket

from .defaults import *

hostname, _, ips = socket.gethostbyname_ex(socket.gethostname())

INTERNAL_IPS = [ip[:-1] + "1" for ip in ips]

ALLOWED_HOSTS = ["*"]

INSTALLED_APPS += ["debug_toolbar", "silk", "django_extensions"]

MIDDLEWARE += [
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    "silk.middleware.SilkyMiddleware",
]

REST_FRAMEWORK.update(
    {
        "TEST_REQUEST_DEFAULT_FORMAT": "json",
        "TEST_REQUEST_RENDERER_CLASSES": [
            "rest_framework.renderers.MultiPartRenderer",
            "rest_framework.renderers.JSONRenderer",
            "rest_framework.renderers.TemplateHTMLRenderer",
        ],
    }
)

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

GRAPH_MODELS = {
    "all_applications": True,
    "group_models": True,
}
