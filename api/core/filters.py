from django_filters import rest_framework as filters
from rest_framework.filters import SearchFilter

from core.models import Course


class CharInFilter(filters.BaseInFilter, filters.CharFilter):
    pass


class CourseFilter(filters.FilterSet):
    min_price = filters.NumberFilter(field_name="price", lookup_expr="gte")
    max_price = filters.NumberFilter(field_name="price", lookup_expr="lte")
    from_date = filters.DateFilter(field_name="date_changed", lookup_expr="gte")
    to_date = filters.DateFilter(field_name="date_changed", lookup_expr="lte")
    teacher = filters.CharFilter(
        field_name="teacher__get_full_name", lookup_expr="icontains", label="Teacher"
    )
    categories = CharInFilter(field_name="categories__slug", lookup_expr="in")

    class Meta:
        model = Course
        fields = [
            "min_price",
            "max_price",
            "from_date",
            "to_date",
            "teacher",
            "categories",
        ]


class CourseSearchFilter(SearchFilter):
    search_fields = ["@description", "@name"]
