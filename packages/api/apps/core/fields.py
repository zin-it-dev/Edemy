from django.db.models import ImageField
from django.db.models.fields.files import ImageFieldFile


class DynamicImageFieldFile(ImageFieldFile):
    def save(self, name, content, save=True):
        if isinstance(content, str):
            self.name = content
            setattr(self.instance, self.field.name, content)
            if save:
                self.instance.save()
        else:
            super().save(name, content, save)

    @property
    def url(self):
        if not self.name:
            return ""
    
        if self.name.startswith(("http://", "https://")):
            return self.name
        
        return super().url


class DynamicImageURLField(ImageField):
    attr_class = DynamicImageFieldFile
    
    def to_python(self, value):
        if isinstance(value, str):
            return value
        return super().to_python(value)

    def get_prep_value(self, value):
        if isinstance(value, str):
            return value
        return super().get_prep_value(value)