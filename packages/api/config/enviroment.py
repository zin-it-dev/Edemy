import os
from django.core.exceptions import ImproperlyConfigured


def env(env_variable, default=None):
    try:
        return os.environ.get(env_variable, default)
    except KeyError:
        error_msg = f"Set the {env_variable} environment variable"
        raise ImproperlyConfigured(error_msg)