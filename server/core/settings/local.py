from .base import *

ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS").split(",")

CORS_ALLOW_ALL_ORIGINS = True

# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': f'django.db.backends.{os.environ.get('POSTGRES_ENGINE')}',
        'NAME': os.environ.get('POSTGRES_DB'),
        'USER': os.environ.get('POSTGRES_USER'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD'),
        'HOST': os.environ.get('POSTGRES_HOST'),
        'PORT': os.environ.get('POSTGRES_PORT'),
    }
}