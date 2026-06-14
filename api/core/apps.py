from django.apps import AppConfig


class CoreConfig(AppConfig):
    name = "core"
    verbose_name = "Edemy 🎓"

    def ready(self):
        pass
