from rest_framework.pagination import BasePagination, PageNumberPagination, LimitOffsetPagination, CursorPagination
from rest_framework.response import Response


class DynamicPagination(BasePagination):  
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


class LargeResultsSetPagination(DynamicPagination):
    page_size = 100
    max_page_size = 1000


class StandardResultsSetPagination(DynamicPagination):
    page_size = 10
    max_page_size = 100