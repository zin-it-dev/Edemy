from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from elasticsearch_dsl import analyzer

from .models import Course, Tag

html_strip = analyzer(
    "html_strip",
    tokenizer="standard",
    filter=["lowercase", "stop", "snowball"],
    char_filter=["html_strip"],
)


@registry.register_document
class CourseDocument(Document):
    tags = fields.KeywordField(
        attr="prepare_tags",
        multi=True,
        fields={
            "raw": fields.TextField(analyzer="keyword"),
        },
    )
    category = fields.TextField(attr="__str__")

    class Index:
        name = "courses"
        settings = {
            "number_of_shards": 1,
            "number_of_replicas": 0,
        }

    class Django:
        model = Course
        fields = ["slug", "name", "description"]
        related_models = [Tag]
