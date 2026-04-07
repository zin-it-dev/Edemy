from common.paginatiors import GenericPagination


class LargeResultsSetPagination(GenericPagination):
    """Pagination class for large result sets, with a default page size of 50 and a maximum page size of 1000."""

    page_size = 50
    max_page_size = 1000


class StandardResultsSetPagination(GenericPagination):
    """Pagination class for standard result sets, with a default page size of 10 and a maximum page size of 100."""

    page_size = 1
    max_page_size = 100