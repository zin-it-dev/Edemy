from unfold.admin import ModelAdmin
from unfold.paginator import InfinitePaginator


class GenericAdmin(ModelAdmin):
    paginator = InfinitePaginator
    show_full_result_count = True
    list_per_page = 20
