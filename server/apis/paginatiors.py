from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination
from rest_framework.response import Response


class GenericPagination(PageNumberPagination):
    def get_paginated_response(self, data):
        if self.is_offset_mode:
            return self.limit_offset.get_paginated_response(data)

        return Response(
            {
                "next": self.get_next_link(),
                "previous": self.get_previous_link(),
                "page_size": self.page_size,
                "count": self.page.paginator.count,
                "results": data,
            }
        )

    def paginate_queryset(self, queryset, request, view=None):
        if "limit" in request.query_params or "offset" in request.query_params:
            self.is_offset_mode = True
            self.limit_offset = LimitOffsetPagination()
            return self.limit_offset.paginate_queryset(queryset, request, view)

        self.is_offset_mode = False
        return super().paginate_queryset(queryset, request, view)


class LargeResultsSetPagination(GenericPagination):
    page_size = 50
    max_page_size = 1000


class StandardResultsSetPagination(GenericPagination):
    page_size = 1
    max_page_size = 100
