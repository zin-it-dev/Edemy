from config.enviroment import env

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DJANGO_DEBUG", 1)

if DEBUG:
    from .local import *
else:
    from .production import *
