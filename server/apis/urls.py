from django.urls import path, include
from rest_framework_nested import routers

from .apiviews import CategoryViewSet, CourseViewSet, ClerkWebhookAPIView
from .views import LineChartJSONView

app_name = "apis"

router = routers.DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'courses', CourseViewSet, basename='course')

urlpatterns = [
    path('', include(router.urls)),
    
    path('webhooks/', ClerkWebhookAPIView.as_view(), name='clerk_webhook'),
    
    # Charts
    path('chart/courses', LineChartJSONView.as_view()),
]