from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry

from .models import Course


@registry.register_document
class CourseDocument(Document):
    """Course Elasticsearch document."""

    tags = fields.KeywordField(
        attr="tags_indexing",
        fields={
            "raw": fields.TextField(analyzer="keyword", multi=True),
            "suggest": fields.CompletionField(multi=True),
        },
        multi=True,
    )
    category = fields.TextField(attr="__str__")

    class Index:
        name = "courses"
        settings = {
            "number_of_shards": 1,
            "number_of_replicas": 0,
        }

    class Django:
        """Inner nested class Django."""

        model = Course
        fields = ["slug", "name", "description"]
