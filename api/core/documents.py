from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry

from .models import Course


@registry.register_document
class CourseDocument(Document):
    """Course Elasticsearch document."""

    teacher = fields.TextField(attr="__str__")
    categories = fields.KeywordField(
        attr="categories_indexing",
        fields={
            "raw": fields.TextField(analyzer="keyword", multi=True),
            "suggest": fields.CompletionField(multi=True),
        },
        multi=True,
    )

    class Index:
        name = "courses"

    class Django:
        """Inner nested class Django."""

        model = Course
        fields = [
            "slug",
            "name",
            "description",
            "price",
            "date_created",
            "date_changed",
        ]

        ignore_signals = False
        auto_refresh = False
        related_models = []
