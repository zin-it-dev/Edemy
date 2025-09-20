from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry

from .models import Course


@registry.register_document
class CourseDocument(Document):
    category = fields.TextField()
    
    class Index:
        name = 'courses'
        settings = {
            'number_of_shards': 1,
            'number_of_replicas': 0
        }

    class Django:
        model = Course

        fields = [
            'id',
            'slug',
            'is_active',
            'name',
            'thumbnail', 
            'description'
        ]
        
        ignore_signals = False
        auto_refresh = True
        
    def prepare_category(self, instance):
        return str(instance.category) if instance.category else ""