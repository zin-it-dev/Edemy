from rest_framework import viewsets, mixins

class SlugFieldLookupMixin(viewsets.GenericViewSet, mixins.ListModelMixin):
    """
    Apply this mixin to any view or viewset to get slug field filtering
    based on a `lookup_fields` attribute, instead of the default single field filtering.
    """
    lookup_fields = ['name']