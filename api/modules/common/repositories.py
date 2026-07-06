# Repository pattern and CQRS (Command Query Responsibility Segregation)
from django.db.models import Model


class GenericQueryRepository:
    """
    Query Query Responsibility Segregation
    """

    def __init__(self, model: Model):
        self.model = model

    def select_all(self):
        return self.model.objects.all()

    def filters(self, **kwargs):
        return self.model.objects.filter(**kwargs)


class GenericCommandRepository:
    """
    Command Responsibility Segregation.
    """

    def __init__(self, model: Model):
        self.model = model

    def update(self, pk, **kwargs):
        obj = self.model.objects.filter(pk, **kwargs)
        if obj:
            for key, value in kwargs.items():
                setattr(obj, key, value)
            obj.save()
            return obj
        return None

    def delete(self, pk, **kwargs):
        obj = self.model.objects.filter(pk, **kwargs)
        if obj:
            obj.soft_deleted()
            return True
        return False
