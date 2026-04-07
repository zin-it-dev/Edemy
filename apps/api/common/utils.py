import contextlib

from django.contrib import admin


def _register_site(models, admin_classes) -> None:
    """Util function register admin site."""
    for model, admin_class in zip(models, admin_classes, strict=False):
        with contextlib.suppress(admin.sites.AlreadyRegistered):
            admin.site.register(model, admin_class)

