import pytest
from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse

from accounts.models import User, Profile
from courses.models import Category, Course, Module, Lesson, Enrollment, LessonProgress


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def student_user(db):
    user = User.objects.create_user(
        email="student@test.com",
        username="student",
        password="TestPass123",
        role=User.Role.USER,
    )
    Profile.objects.get_or_create(user=user)
    return user


@pytest.fixture
def teacher_user(db):
    user = User.objects.create_user(
        email="teacher@test.com",
        username="teacher",
        password="TestPass123",
        role=User.Role.TEACHER,
    )
    Profile.objects.get_or_create(user=user)
    return user


@pytest.fixture
def category(db):
    return Category.objects.create(name="Python", slug="python", icon="🐍")


@pytest.fixture
def course(db, category, teacher_user):
    return Course.objects.create(
        title="Learn Python",
        category=category,
        instructor=teacher_user,
        level=Course.Level.BEGINNER,
        status=Course.Status.PUBLISHED,
        is_free=True,
    )


@pytest.fixture
def module_with_lessons(db, course):
    module = Module.objects.create(course=course, title="Chapter 1", position=1)
    lesson1 = Lesson.objects.create(
        module=module, title="Intro", order=1, xp_reward=10, coin_reward=5
    )
    lesson2 = Lesson.objects.create(
        module=module, title="Variables", order=2, xp_reward=15, coin_reward=7
    )
    return module, lesson1, lesson2


class TestCategoryModel(TestCase):
    def test_category_auto_slug(self):
        """Category should auto-generate slug from name."""
        cat = Category.objects.create(name="Machine Learning")
        self.assertEqual(cat.slug, "machine-learning")

    def test_category_str(self):
        cat = Category.objects.create(name="Frontend", slug="frontend")
        self.assertEqual(str(cat), "Frontend")


class TestCourseModel(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="JS", slug="js")
        self.teacher = User.objects.create_user(
            email="t@t.com", username="t", password="pass", role=User.Role.TEACHER
        )

    def test_course_effective_price_free(self):
        course = Course.objects.create(
            title="Free JS",
            category=self.category,
            instructor=self.teacher,
            is_free=True,
            price=0,
            status=Course.Status.PUBLISHED,
        )
        self.assertEqual(course.effective_price, 0)

    def test_course_effective_price_with_discount(self):
        course = Course.objects.create(
            title="Paid JS",
            category=self.category,
            instructor=self.teacher,
            price=100,
            discount=20,
            status=Course.Status.PUBLISHED,
        )
        self.assertEqual(float(course.effective_price), 80.0)

    def test_course_enrollment_count(self):
        student = User.objects.create_user(
            email="s@s.com", username="s", password="pass", role=User.Role.USER
        )
        course = Course.objects.create(
            title="Counted",
            category=self.category,
            instructor=self.teacher,
            status=Course.Status.PUBLISHED,
        )
        Enrollment.objects.create(course=course, student=student)
        self.assertEqual(course.enrollment_count, 1)


class TestEnrollmentProgress(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Test", slug="test")
        self.teacher = User.objects.create_user(
            email="tr@t.com", username="tr", password="pass", role=User.Role.TEACHER
        )
        self.student = User.objects.create_user(
            email="st@s.com", username="st", password="pass", role=User.Role.USER
        )
        Profile.objects.get_or_create(user=self.student)
        self.course = Course.objects.create(
            title="Progress Test",
            category=self.category,
            instructor=self.teacher,
            status=Course.Status.PUBLISHED,
            is_free=True,
        )
        self.module = Module.objects.create(course=self.course, title="M1", position=1)
        self.lesson1 = Lesson.objects.create(module=self.module, title="L1", order=1)
        self.lesson2 = Lesson.objects.create(module=self.module, title="L2", order=2)
        self.enrollment = Enrollment.objects.create(
            course=self.course, student=self.student
        )

    def test_progress_zero_initially(self):
        self.assertEqual(self.enrollment.progress_percentage, 0)

    def test_progress_half_completed(self):
        LessonProgress.objects.create(
            enrollment=self.enrollment, lesson=self.lesson1, is_completed=True
        )
        self.assertEqual(self.enrollment.progress_percentage, 50)

    def test_progress_fully_completed(self):
        LessonProgress.objects.create(
            enrollment=self.enrollment, lesson=self.lesson1, is_completed=True
        )
        LessonProgress.objects.create(
            enrollment=self.enrollment, lesson=self.lesson2, is_completed=True
        )
        self.assertEqual(self.enrollment.progress_percentage, 100)


@pytest.mark.django_db
class TestCourseAPI:
    """TDD: API tests for course endpoints."""

    blog_list_url = reverse("courses:course-list")

    def test_list_published_courses_unauthenticated(self, api_client, course):
        """Unauthenticated users can list published courses."""
        url = "/api/courses/"
        response = api_client.get(url)
        assert response.status_code == 200
        assert len(response.data["results"]) >= 1

    def test_draft_courses_hidden_from_public(self, api_client, category, teacher_user):
        """Draft courses should NOT appear to public."""
        Course.objects.create(
            title="Draft Course",
            category=category,
            instructor=teacher_user,
            status=Course.Status.DRAFT,
        )
        response = api_client.get("/api/courses/")
        for course in response.data.get("results", []):
            assert course["status"] != "DRAFT"

    def test_enroll_in_free_course(self, api_client, student_user, course):
        """Authenticated student can enroll in a free course."""
        api_client.force_authenticate(user=student_user)
        response = api_client.post(f"/api/courses/{course.id}/enroll/")
        assert response.status_code == 201
        assert Enrollment.objects.filter(student=student_user, course=course).exists()

    def test_enroll_twice_returns_400(self, api_client, student_user, course):
        """Enrolling twice should return 400."""
        api_client.force_authenticate(user=student_user)
        Enrollment.objects.create(student=student_user, course=course)
        response = api_client.post(f"/api/courses/{course.id}/enroll/")
        assert response.status_code == 400

    def test_mark_lesson_complete_awards_xp(
        self, api_client, student_user, course, module_with_lessons
    ):
        """Completing a lesson should award XP to the student's profile."""
        module, lesson1, lesson2 = module_with_lessons
        api_client.force_authenticate(user=student_user)
        # Enroll first
        Enrollment.objects.create(student=student_user, course=course)
        initial_xp = student_user.profile.xp

        response = api_client.post(
            f"/api/courses/{course.id}/lessons/{lesson1.id}/complete/"
        )
        assert response.status_code == 200
        assert response.data["xp_earned"] == lesson1.xp_reward
        student_user.profile.refresh_from_db()
        assert student_user.profile.xp == initial_xp + lesson1.xp_reward

    def test_search_courses_by_keyword(self, api_client, course):
        """Search filter should find course by title keyword."""
        response = api_client.get("/api/courses/?search=Python")
        assert response.status_code == 200
        titles = [c["title"] for c in response.data.get("results", [])]
        assert any("Python" in t for t in titles)

    def test_filter_courses_by_level(self, api_client, course):
        """Filter by level=BEGINNER should return only beginner courses."""
        response = api_client.get("/api/courses/?level=BEGINNER")
        assert response.status_code == 200
        for c in response.data.get("results", []):
            assert c["level"] == "BEGINNER"


class TestAdvancedLearningModels(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Advanced JS", slug="adv-js")
        self.course = Course.objects.create(
            title="Pro JS", category=self.category, status=Course.Status.PUBLISHED
        )
        self.module = Module.objects.create(
            course=self.course, title="Module 1", position=1
        )
        self.lesson = Lesson.objects.create(
            module=self.module, title="Lesson 1", order=1
        )

    def test_subtopic_creation(self):
        from courses.models import Subtopic

        sub = Subtopic.objects.create(lesson=self.lesson, title="Promises", order=1)
        self.assertEqual(str(sub), f"{self.lesson.title} - Promises")

    def test_study_type_content(self):
        from courses.models import StudyTypeContent

        content = StudyTypeContent.objects.create(
            lesson=self.lesson,
            content_type=StudyTypeContent.Type.VIDEO,
            url="http://test.com",
        )
        self.assertEqual(content.content_type, "VIDEO")

    def test_chapter_content_slide(self):
        from courses.models import ChapterContentSlide

        slide = ChapterContentSlide.objects.create(
            lesson=self.lesson, order=1, title="Slide 1", content="Hello"
        )
        self.assertEqual(slide.order, 1)

    def test_discussion_room(self):
        from courses.models import DiscussionRoom

        room = DiscussionRoom.objects.create(course=self.course, name="General Chat")
        self.assertEqual(str(room), f"General Chat ({self.course.title})")
