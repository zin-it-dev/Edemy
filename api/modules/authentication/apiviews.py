from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows ``Users`` to be viewed or edited.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ["current_user"]:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    @action(
        methods=["GET"],
        detail=False,
        url_path="current-user",
        url_name="current_user",
        name="Current User",
    )
    def current_user(self, request):
        """
        API endpoint that allows read infomation current user.
        """
        serializer = self.get_serializer(self.request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
