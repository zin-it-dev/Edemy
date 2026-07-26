from .defaults import *

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

DATABASES["default"] = {"ENGINE": "django.db.backends.sqlite3", "NAME": ":memory:"}

PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.MD5PasswordHasher",
]

EMAIL_BACKEND = "django.core.mail.backends.locmem.EmailBackend"

# Django’s cache framework
# https://docs.djangoproject.com/en/6.0/topics/cache/

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "unique-snowflake",
    }
}
