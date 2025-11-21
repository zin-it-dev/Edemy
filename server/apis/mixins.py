import random

from rest_framework import viewsets
from typing import Iterator, Tuple, List

from .utils import generate_colors


class ColorMixin:
    def get_colors(self) -> Iterator[Tuple[int, int, int]]:
        num_providers = len(self.get_providers())
        return iter(generate_colors(num_providers))


class ReadOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = "slug"
