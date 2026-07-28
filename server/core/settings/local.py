from .defaults import *


TESTING = "test" in sys.argv or "PYTEST_VERSION" in os.environ

INTERNAL_IPS = ["127.0.0.1"]

CORS_ALLOW_ALL_ORIGINS = True

INSTALLED_APPS += ["debug_toolbar", "silk"]

MIDDLEWARE += [
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    "silk.middleware.SilkyMiddleware",
]

DEBUG_TOOLBAR_CONFIG = {
    "SHOW_TOOLBAR_CALLBACK": lambda request: (
        DEBUG or "debug_toolbar.middleware.show_toolbar_with_docker"
    )
}
