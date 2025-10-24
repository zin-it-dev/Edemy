from adrf.viewsets import ReadOnlyModelViewSet

class ReadOnlyViewSet(ReadOnlyModelViewSet):
    lookup_field = "slug"