from rest_framework import generics, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .filters import CourseFilter
from .mixins import GenericReadOnlyModelViewSet, ListModelViewSet
from .models import Category, Course, User
from .paginators import StandardResultsSetPagination
from .serializers import CategorySerializer, CourseSerializer, UserSerializer


class UserViewSet(viewsets.ViewSet, generics.GenericAPIView):
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


class CategoryViewSet(ListModelViewSet):
    """
    API endpoint that allows ``Categories`` to be viewed.
    """

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    exclude = ("date_created", "date_changed")


class CourseViewSet(GenericReadOnlyModelViewSet):
    """
    API endpoint that allows ``Courses`` to be viewed or edited.
    """

    exclude = ("description", "categories", "teacher")
    queryset = Course.objects.prefetch_related("categories").order_by("date_created")
    serializer_class = CourseSerializer
    # search_fields = ["name", "description", "teacher__full_name"]
    ordering_fields = GenericReadOnlyModelViewSet.ordering_fields + ["name"]
    filterset_class = CourseFilter
    pagination_class = StandardResultsSetPagination
