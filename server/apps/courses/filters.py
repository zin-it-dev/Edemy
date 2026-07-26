import django_filters
from courses.models import Course, Category


class CourseFilter(django_filters.FilterSet):
    """
    Filter courses by keyword, category, level, price range, language, instructor.
    Usage: GET /courses/?search=python&level=BEGINNER&price_max=50
    """

    search = django_filters.CharFilter(method="filter_search", label="Search keyword")
    category = django_filters.CharFilter(
        field_name="category__slug", lookup_expr="exact"
    )
    level = django_filters.ChoiceFilter(choices=Course.Level.choices)
    price_min = django_filters.NumberFilter(field_name="price", lookup_expr="gte")
    price_max = django_filters.NumberFilter(field_name="price", lookup_expr="lte")
    is_free = django_filters.BooleanFilter()
    language = django_filters.CharFilter(lookup_expr="iexact")
    instructor = django_filters.CharFilter(
        field_name="instructor__username", lookup_expr="icontains"
    )
    is_ai_generated = django_filters.BooleanFilter()

    class Meta:
        model = Course
        fields = ["level", "is_free", "language", "is_ai_generated"]

    def filter_search(self, queryset, name, value):
        from django.db.models import Q

        return queryset.filter(
            Q(title__icontains=value)
            | Q(description__icontains=value)
            | Q(category__name__icontains=value)
            | Q(instructor__username__icontains=value)
            | Q(instructor__first_name__icontains=value)
        )
