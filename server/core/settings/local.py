from .base import *

INTERNAL_IPS = ["127.0.0.1"]

if not TESTING:
    INSTALLED_APPS += ["debug_toolbar", "silk"]

    MIDDLEWARE += [
        "silk.middleware.SilkyMiddleware",
        "debug_toolbar.middleware.DebugToolbarMiddleware",
    ]

    DEBUG_TOOLBAR_CONFIG = {
        "SHOW_TOOLBAR_CALLBACK": lambda request: True,
        "INTERCEPT_REDIRECTS": False,
    }

    REST_FRAMEWORK = {
        **REST_FRAMEWORK,
        "TEST_REQUEST_DEFAULT_FORMAT": "json",
        "TEST_REQUEST_RENDERER_CLASSES": [
            "rest_framework.renderers.MultiPartRenderer",
            "rest_framework.renderers.JSONRenderer",
            "rest_framework.renderers.TemplateHTMLRenderer",
        ],
    }
