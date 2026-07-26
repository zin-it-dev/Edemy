from .defaults import *

INSTALLED_APPS += ["debug_toolbar", "silk"]

ALLOWED_HOSTS = ["*"]

CORS_ALLOW_ALL_ORIGINS = True

MIDDLEWARE += [
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    "silk.middleware.SilkyMiddleware",
]

DEBUG_TOOLBAR_CONFIG = {
    "SHOW_TOOLBAR_CALLBACK": lambda request: (
        DEBUG or "debug_toolbar.middleware.show_toolbar_with_docker"
    )
}
