import abc

from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins, viewsets
from rest_framework.filters import OrderingFilter, SearchFilter


class DynamicFieldsMixin:
    exclude = None

    def get_serializer(self, *args, **kwargs):
        if getattr(self, "action", None) == "list" and self.exclude is not None:
            kwargs["exclude"] = set(self.exclude)
        return super().get_serializer(*args, **kwargs)


class HyperlinkedFieldMixin:
    lookup_field = "slug"
    lookup_url_kwarg = "slug"


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


class GenericReadOnlyModelViewSet(
    DynamicFieldsMixin, HyperlinkedFieldMixin, viewsets.ReadOnlyModelViewSet
):
    """
    A viewset that provides `retrieve` and `list` actions, lookup with slug.

    To use it, override the class and set the `.queryset`,
    `.serializer_class`, `filter_backends`, `ordering_fields` and `.exclude` attributes.
    """

    filter_backends = [OrderingFilter, DjangoFilterBackend]
    ordering_fields = ["date_changed"]
    ordering = ["-date_created"]


class ListModelViewSet(
    DynamicFieldsMixin,
    HyperlinkedFieldMixin,
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
):
    """
    A viewset that provides `list` actions, lookup with slug.

    To use it, override the class and set the `.queryset`,
    `.serializer_class` and `.exclude` attributes.
    """


class StaffLoginRequiredMixin(LoginRequiredMixin, UserPassesTestMixin):
    raise_exception = True

    def test_func(self):
        return self.request.user.is_staff
