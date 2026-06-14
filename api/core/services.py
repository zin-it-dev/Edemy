from django.db import transaction

from .models import Course, Enrollment


def enroll_student_to_course(student_id: int, course_id: int) -> Enrollment:
    with transaction.atomic():
        course = Course.objects.select_for_update().get(id=course_id)

        enrollment = Enrollment.objects.create(student_id=student_id, course=course)
        return enrollment
