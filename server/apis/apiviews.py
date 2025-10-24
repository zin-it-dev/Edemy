from svix import Webhook, WebhookVerificationError
from rest_framework import status, viewsets, mixins, views
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.conf import settings
from rest_framework.views import APIView
from celery.result import AsyncResult

from .schemas import CourseOutlineSchema
from .mixins import ReadOnlyViewSet
from .repositories import CategoryRepository
from .serializers import CategorySerializer, CourseSerializer
from .models import Course, User
from .services import sync_clerk_user


@method_decorator(csrf_exempt, name='dispatch')
class ClerkWebhookAPIView(views.APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        headers = request.headers
        payload = request.body
        
        try:
            wh = Webhook(settings.CLERK_WEBHOOK_SECRET)
            msg = wh.verify(payload, headers)
            sync_clerk_user(msg)
            return Response({'message': 'Webhook received and processed'}, status=status.HTTP_200_OK)
        except WebhookVerificationError:
            return Response({"error": "Invalid signature"}, status=status.HTTP_400_BAD_REQUEST)
        

class CategoryViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    queryset = CategoryRepository().get_all()
    serializer_class = CategorySerializer
    
    
class CourseViewSet(ReadOnlyViewSet):
    queryset = Course.objects.filter(user__is_staff=True).all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]