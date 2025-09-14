import os

from celery import Celery

from core.settings import base

if base.DEBUG:
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings.local")
else:
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings.prod")

app = Celery("core", result_extended=True)

app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()