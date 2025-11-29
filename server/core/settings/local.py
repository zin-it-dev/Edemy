from .base import *

INTERNAL_IPS = ["127.0.0.1"]

# Email
# See https://docs.djangoproject.com/en/5.2/topics/email/

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

EMAIL_HOST = "sandbox.smtp.mailtrap.io"
EMAIL_HOST_USER = "86fbac0b16312d"
EMAIL_HOST_PASSWORD = "fdc3b90ffd9196"


if not TESTING:
    # Application definition
    INSTALLED_APPS += ["debug_toolbar", "silk"]

    MIDDLEWARE += [
        "silk.middleware.SilkyMiddleware",
        "debug_toolbar.middleware.DebugToolbarMiddleware",
    ]

    # Debug Toolbar
    # See https://django-debug-toolbar.readthedocs.io/en/latest/installation.html

    DEBUG_TOOLBAR_CONFIG = {
        "SHOW_TOOLBAR_CALLBACK": lambda request: True,
        "INTERCEPT_REDIRECTS": False,
    }

    # Django REST Framework
    # See https://www.django-rest-framework.org/api-guide/testing/#setting-up-the-test-client

    REST_FRAMEWORK = {
        **REST_FRAMEWORK,
        "TEST_REQUEST_DEFAULT_FORMAT": "json",
        "TEST_REQUEST_RENDERER_CLASSES": [
            "rest_framework.renderers.MultiPartRenderer",
            "rest_framework.renderers.JSONRenderer",
            "rest_framework.renderers.TemplateHTMLRenderer",
        ],
    }


# Logging
# See https://docs.djangoproject.com/en/5.2/topics/logging/

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {"level": "DEBUG", "class": "logging.StreamHandler"},
    },
    "loggers": {
        "django.request": {
            "handlers": ["console"],
            "level": "ERROR",
            "propagate": False,
        }
    },
}
