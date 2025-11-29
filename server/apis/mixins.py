import abc

from typing import Iterator, Tuple, List
from rest_framework import viewsets
from rest_framework_extensions.mixins import DetailSerializerMixin
from rest_framework_extensions.cache.mixins import CacheResponseMixin
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db import models
from model_utils.models import TimeStampedModel, SoftDeletableModel
from taggit.managers import TaggableManager
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify

from .utils import generate_colors


class ColorMixin:
    """ "A mixin to dynamically generate a sufficient number of unique colors."""

    def get_colors(self) -> Iterator[Tuple[int, int, int]]:
        num_providers = len(self.get_providers())
        return iter(generate_colors(num_providers))


class GenericModel(TimeStampedModel, SoftDeletableModel):
    """A mixin to be inherited by all models."""

    class Meta:
        abstract = True


class SlugifyModel(models.Model):
    """A mixin to be inherited by all models use slug field."""

    slug = models.SlugField(
        unique=True,
        verbose_name=_("URI"),
        help_text=_("A unique, URL-friendly string, usually derived from the name."),
    )

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class TaggifyModel(GenericModel, SlugifyModel):
    """A mixin to enable generic tagging across inheriting models."""

    tags = TaggableManager()

    class Meta:
        abstract = True


class SearchMixin:
    """A mixin to override the default DRF filtering mechanism with Elasticsearch search."""

    filter_backends = [SearchFilter]

    @abc.abstractmethod
    def generate_search_query(self, query):
        """This method should be overridden and return a Q() expression."""

    def filter_queryset(self, queryset):
        param = self.request.query_params.get("search")
        if param:
            q = self.generate_search_query(param)
            search = self.document_class.search().query(q)
            response = search.execute()
            return response
        return super().filter_queryset(queryset)


class OrderingMixin:
    """A mixin to enable standard ordering functionality."""

    filter_backends = [OrderingFilter]
    ordering_fields = ["created"]
    ordering = ["-created"]


class ReadOnlyCachedViewSet(
    CacheResponseMixin, DetailSerializerMixin, viewsets.ReadOnlyModelViewSet
):
    """
    A viewset that provides cached `retrieve` and `list` actions.

    To use it, override the class, applies response caching and set the `lookup_field` attribute by slug.
    """

    lookup_field = "slug"
