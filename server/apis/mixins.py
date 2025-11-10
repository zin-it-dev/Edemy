import random

from rest_framework import viewsets
from typing import Iterator, Tuple, List

class ColorMixin:
    def get_colors(self) -> Iterator[Tuple[int, int, int]]:
        num_providers = len(self.get_providers())
        colors = []
        
        for _ in range(num_providers):
            r = random.randint(0, 255)
            g = random.randint(0, 255)
            b = random.randint(0, 255)
            colors.append((r, g, b))
        return iter(colors)


class ReadOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = "slug"