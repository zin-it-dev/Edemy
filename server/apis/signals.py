from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from .models import User, Profile, OrderItem

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        
        
@receiver([post_save, post_delete], sender=OrderItem)
def update_order(sender, instance, **kwargs):
    instance.order.update_totals()