import random, abc

from rest_framework.viewsets import ReadOnlyModelViewSet
from typing import Iterator, Tuple, List
from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from rest_framework import status
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify

from .utils import generate_colors


class ColorMixin:
    def get_colors(self) -> Iterator[Tuple[int, int, int]]:
        num_providers = len(self.get_providers())
        return iter(generate_colors(num_providers))


class GenericMixin(models.Model):
    """Generic mixin to be inherited by all models."""

    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Specifies whether this entity should be considered active."
            "Uncheck this instead of deleting the entity."
        ),
    )
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = ["-date_created", "-date_updated"]


class SlugifyMixin(models.Model):
    """Slugify mixin to be inherited by all models use slug field."""

    slug = models.SlugField(unique=True)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class SearchMixin(ReadOnlyModelViewSet):
    lookup_field = "slug"
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
        else:
            return super().filter_queryset(queryset)

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.filter_queryset(self.get_queryset())
            page = self.paginate_queryset(queryset)

            if page is not None:
                serializer = self.serializer_class(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
