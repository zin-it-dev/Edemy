from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.db.models import Window, F
from django.db.models.functions import Rank

from accounts.models import User, Profile, UserActivity
from accounts.api.serializers import (
    UserSerializer,
    UserProfileUpdateSerializer,
    ProfileSerializer,
    UserActivitySerializer,
    LeaderboardEntrySerializer,
)


class UserViewSet(viewsets.ViewSet):
    """
    ViewSet for User management.

    Provides CRUD operations plus special actions:
    - `current-user`: GET the authenticated user's profile
    - `leaderboard`: GET top 10 users by XP
    - `activities`: GET current user's activity feed
    """

    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_permissions(self):
        if self.action in ["current_user"]:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=["get"], url_path="current-user")
    def current_user(self, request):
        """Get the currently authenticated user."""
        serializer = self.serializer_class(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"], url_path="leaderboard")
    def leaderboard(self, request):
        """Return top 10 users by XP for the leaderboard."""
        top_profiles = Profile.objects.select_related("user").order_by("-xp")[:10]
        data = []
        for rank, profile in enumerate(top_profiles, start=1):
            serializer = LeaderboardEntrySerializer(profile, context={"rank": rank})
            data.append(serializer.data)
        return Response(data)

    @action(detail=False, methods=["get"], url_path="activities")
    def activities(self, request):
        """Get the current user's recent activity feed."""
        profile = getattr(request.user, "profile", None)
        if not profile:
            return Response([])
        activities = UserActivity.objects.filter(profile=profile).order_by("-created")[
            :50
        ]
        serializer = UserActivitySerializer(activities, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_path="my-rank")
    def my_rank(self, request):
        """Get the current user's rank in the leaderboard."""
        profile = getattr(request.user, "profile", None)
        if not profile:
            return Response({"rank": None, "xp": 0})
        rank = Profile.objects.filter(xp__gt=profile.xp).count() + 1
        return Response(
            {
                "rank": rank,
                "xp": profile.xp,
                "coins": profile.coins,
                "level": profile.level,
                "daily_streak": profile.daily_streak,
            }
        )

    @action(detail=False, methods=["post"], url_path="complete-onboarding")
    def complete_onboarding(self, request):
        """Mark onboarding as complete and set learning preferences."""
        profile = getattr(request.user, "profile", None)
        if not profile:
            return Response(
                {"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND
            )

        learning_goal = request.data.get("learning_goal", "")
        preferred_difficulty = request.data.get("preferred_difficulty", "BEGINNER")

        profile.onboarding_completed = True
        profile.learning_goal = learning_goal
        profile.preferred_difficulty = preferred_difficulty
        profile.save(
            update_fields=[
                "onboarding_completed",
                "learning_goal",
                "preferred_difficulty",
            ]
        )

        return Response({"success": True, "message": "Onboarding complete!"})
