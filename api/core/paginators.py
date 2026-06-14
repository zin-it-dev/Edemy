from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class GenericPagination(PageNumberPagination):
    page_size_query_param = "page_size"

    def get_paginated_response(self, data):
        return Response(
            {
                "next": self.get_next_link(),
                "previous": self.get_previous_link(),
                "page_size": self.page_size,
                "count": self.page.paginator.count,
                "results": data,
            }
        )


class LargeResultsSetPagination(GenericPagination):
    page_size = 50
    max_page_size = 1000


class StandardResultsSetPagination(GenericPagination):
    page_size = 2
    max_page_size = 100
