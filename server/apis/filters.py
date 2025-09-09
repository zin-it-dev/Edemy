import django_filters

from .models import Course

class CourseFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(
        field_name='category__slug',
        lookup_expr='exact',
        label='Category'
    )
    
    class Meta:
        model = Course
        fields = ['category']