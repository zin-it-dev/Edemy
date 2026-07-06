from .defaults import *


if TESTING:
    DATABASES['default'] = {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': ':memory:'
    }

REST_FRAMEWORK.update(
    {
        "TEST_REQUEST_DEFAULT_FORMAT": "json",
    }
)

PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.MD5PasswordHasher",
]
