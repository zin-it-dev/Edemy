from rest_framework import viewsets

class ReadOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = "slug"