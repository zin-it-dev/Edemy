"""
TDD tests for the Gamification app.
Run: cd server && .venv/bin/pytest apps/gamification/tests.py -v
"""

import pytest
from django.test import TestCase
from django.utils import timezone
from datetime import timedelta

from accounts.models import User, Profile
from gamification.models import Level, DailyBountie, UserProgress, XPEvent, DailyStreak


class TestGamificationModels(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="gamer@test.com", username="gamer", password="password"
        )
        self.profile, _ = Profile.objects.get_or_create(user=self.user)

    def test_level_creation(self):
        level = Level.objects.create(name="Novice", required_xp=0, badge_icon="🔰")
        self.assertEqual(str(level), "Novice (0 XP)")

    def test_daily_bountie(self):
        bountie = DailyBountie.objects.create(
            title="Complete 3 Lessons",
            description="Finish 3 lessons today.",
            xp_reward=50,
            coin_reward=10,
            target_count=3,
        )
        self.assertEqual(str(bountie), "Complete 3 Lessons (50 XP)")

    def test_user_progress(self):
        progress = UserProgress.objects.create(
            user=self.user, total_time_spent=120, courses_completed_count=1
        )
        self.assertEqual(str(progress), f"Progress for {self.user.email}")

    def test_xp_event(self):
        event = XPEvent.objects.create(
            user=self.user,
            amount=20,
            source=XPEvent.Source.LESSON_COMPLETED,
            description="Completed Intro",
        )
        self.assertEqual(event.amount, 20)
        self.assertEqual(event.source, "LESSON_COMPLETED")

    def test_daily_streak_increment(self):
        streak = DailyStreak.objects.create(user=self.user)
        self.assertEqual(streak.current_streak, 0)

        # Check in today
        streak.check_in()
        self.assertEqual(streak.current_streak, 1)

        # Check in again today (should not increment)
        streak.check_in()
        self.assertEqual(streak.current_streak, 1)
