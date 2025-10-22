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
from .serializers import CategorySerializer, CourseSerializer, CourseGenerationRequestSerializer
from .models import Course, User
from .services import sync_clerk_user
from .tasks import execute_llm


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
    
    def get_serializer_class(self):
        if self.action == 'generate':
            return CourseGenerationRequestSerializer
        return self.serializer_class
    
    def get_permissions(self):
        if self.action in ['generate', 'status', 'my_courses']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]
    
    @action(methods=['post'], detail=False, url_path='generate')
    def generate(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            task = execute_llm.delay(data)
            return Response({"task_id": task.id, 'status': task.status}, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    @action(methods=['get'], detail=False, url_path='status/(?P<task_id>[^/.]+)')
    def status(self, request, task_id=None):
        result = AsyncResult(task_id)
        response = {
            "status": result.status,
            "result": None
        }
        if result.successful():
            response["result"] = result.get() 
        return Response(response, status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False, url_path='my-courses')
    def my_courses(self, request):
        response = Course.objects.filter(user=request.user)
        return Response(self.serializer_class(response).data, status=status.HTTP_200_OK)