from .base import *

INTERNAL_IPS = ["127.0.0.1", "localhost"]

CORS_ORIGIN_ALLOW_ALL = True

INSTALLED_APPS += [
    "debug_toolbar",
    'silk'
]

MIDDLEWARE += [
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    'silk.middleware.SilkyMiddleware'
]

DEBUG_TOOLBAR_CONFIG = {
    'SHOW_TOOLBAR_CALLBACK': lambda request: True,
    'INTERCEPT_REDIRECTS': False,
}