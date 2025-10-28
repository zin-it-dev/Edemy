from django_filters import rest_framework as filters

from .models import Course

class CourseFilter(filters.FilterSet):
    category = filters.CharFilter(
        field_name='category__slug', 
        lookup_expr='exact',
        label='Category'
    )
    
    class Meta:
        model = Course
        fields = ['category']