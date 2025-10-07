"""
ASGI config for core project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator

from core.settings import base
from apis.routing import websocket_urlpatterns

if base.DEBUG:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.local')
else:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.prod')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AllowedHostsOriginValidator(
        AuthMiddlewareStack(URLRouter(websocket_urlpatterns))
    ),
})
