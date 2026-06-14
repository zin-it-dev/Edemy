from django.core.management.commands import shell


class Command(shell.Command):
    def get_auto_imports(self):
        return super().get_auto_imports() + [
            "django.urls.reverse",
            "django.urls.resolve",
            "django.apps.apps",
        ]
