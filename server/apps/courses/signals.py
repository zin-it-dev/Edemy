from django.db.models.signals import post_save
from django.dispatch import receiver
from courses.models import Enrollment


@receiver(post_save, sender=Enrollment)
def enrollment_created(sender, instance, created, **kwargs):
    """When a new enrollment is created, log activity and update stats."""
    if created:
        from accounts.models import UserActivity

        profile = getattr(instance.student, "profile", None)
        if profile:
            UserActivity.objects.create(
                profile=profile,
                activity_type=UserActivity.ActivityType.COMPLETE_LESSON,
                xp_earned=0,
                coins_earned=0,
                points_earned=0,
                description=f"Enrolled in: {instance.course.title}",
            )
