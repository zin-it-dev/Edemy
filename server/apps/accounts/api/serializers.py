from rest_framework import serializers
from accounts.models import User, Profile, Trophy, UserTrophy, UserActivity


class TrophySerializer(serializers.ModelSerializer):
    class Meta:
        model = Trophy
        fields = [
            "id",
            "name",
            "description",
            "icon",
            "requirement_type",
            "requirement_value",
            "xp_reward",
            "coin_reward",
        ]


class UserTrophySerializer(serializers.ModelSerializer):
    trophy = TrophySerializer(read_only=True)

    class Meta:
        model = UserTrophy
        fields = ["trophy", "earned_at"]


class ProfileSerializer(serializers.ModelSerializer):
    earned_trophies = UserTrophySerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = [
            "id",
            "xp",
            "coins",
            "level",
            "points",
            "daily_streak",
            "longest_streak",
            "is_premium_member",
            "onboarding_completed",
            "learning_goal",
            "preferred_difficulty",
            "last_active_date",
            "earned_trophies",
        ]
        read_only_fields = [
            "xp",
            "coins",
            "level",
            "points",
            "daily_streak",
            "longest_streak",
        ]


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
            "role",
            "bio",
            "picture",
            "credits",
            "timezone",
            "is_active",
            "date_joined",
            "profile",
        ]
        read_only_fields = ["id", "email", "role", "credits", "date_joined"]


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    """For updating user profile fields."""

    learning_goal = serializers.CharField(
        source="profile.learning_goal", allow_blank=True, required=False
    )
    preferred_difficulty = serializers.CharField(
        source="profile.preferred_difficulty", allow_blank=True, required=False
    )
    onboarding_completed = serializers.BooleanField(
        source="profile.onboarding_completed", required=False
    )

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "bio",
            "picture",
            "timezone",
            "learning_goal",
            "preferred_difficulty",
            "onboarding_completed",
        ]

    def update(self, instance, validated_data):
        profile_data = validated_data.pop("profile", {})
        # Update User fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        # Update Profile fields
        if profile_data and hasattr(instance, "profile"):
            for attr, value in profile_data.items():
                setattr(instance.profile, attr, value)
            instance.profile.save()
        return instance


class UserActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserActivity
        fields = [
            "id",
            "activity_type",
            "xp_earned",
            "coins_earned",
            "description",
            "created",
        ]


class LeaderboardEntrySerializer(serializers.ModelSerializer):
    """Serializer for leaderboard data."""

    user_id = serializers.UUIDField(source="user.id")
    email = serializers.EmailField(source="user.email")
    full_name = serializers.SerializerMethodField()
    picture = serializers.URLField(source="user.picture")
    rank = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            "user_id",
            "email",
            "full_name",
            "picture",
            "xp",
            "coins",
            "level",
            "daily_streak",
            "rank",
        ]

    def get_full_name(self, obj):
        return obj.user.get_full_name() or obj.user.username

    def get_rank(self, obj):
        return self.context.get("rank", 0)
