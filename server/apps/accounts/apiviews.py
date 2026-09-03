from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from accounts.models import User
from accounts.serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny


class UserViewSet(viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    @action(
        detail=False, methods=["get"], url_path="current-user", url_name="current_user"
    )
    def current_user(self, request):
        "Get current logged in user"
        serializer = self.get_serializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
