import os
from collections.abc import Callable
from typing import TypeVar

from django.core.exceptions import ImproperlyConfigured

T = TypeVar("T")


def get_env(key: str, default: T | None = None, converter: Callable[[str], T] = str):
    value = os.environ.get(key)

    if value is None:
        if default is None:
            error_msg = f"{key} is required but not set in the environment"
            raise ImproperlyConfigured(error_msg)
        return default

    try:
        return converter(value)
    except KeyError:
        error_msg = f"{key} is required but not set in the environment"
        raise ImproperlyConfigured(error_msg)
