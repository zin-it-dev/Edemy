import uuid

from django.contrib.auth.models import AbstractUser
from cloudinary_storage.storage import MediaCloudinaryStorage
from django.db import models
from django.contrib import admin
from django.utils.html import mark_safe
from django.core.validators import MinValueValidator, MaxValueValidator

from .managers import UserManager
from .utils import gravatar_url

class User(AbstractUser):
    ROLE_CHOICES = (
        ('ADMIN', 'Admin'),
        ('USER', 'User')
    )
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='USER')
    email = models.EmailField(unique=True)
    picture = models.URLField(max_length=200, blank=True, null=True, default=gravatar_url)
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['username']
    
    objects = UserManager()
    
    def __str__(self):
        return self.get_full_name() or self.email
    
    def save(self, *args, **kwargs):
        if self.is_superuser:
            self.role = 'ADMIN'
        super().save(*args, **kwargs)

    @admin.display(description="Avatar")
    def avatar(self):
        return mark_safe(
            f'<img src={self.picture} width="80" height="80" alt={self.username} class="img-thumbnail shadow" />'
        )
    
    
class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    bio = models.TextField(blank=True)


class Common(models.Model):
    is_active = models.BooleanField(default=True, verbose_name="Active")
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True


class Category(Common):
    name = models.CharField(unique=True, max_length=80)
    
    class Meta:
        verbose_name_plural = "Categories"
    
    def __str__(self):
        return self.name
    
    
class Course(Common):
    name = models.CharField(max_length=120)
    thumbnail = models.ImageField(upload_to='courses/%y/%m/%d', blank=True, storage=MediaCloudinaryStorage())
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00) 
    discount = models.FloatField(default=0.00) 
    
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name


class Lesson(Common):
    name = models.CharField(max_length=120)
    content = models.TextField()
    
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ['course', 'name']
    
    def __str__(self):
        return self.name


class Interact(Common):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    
    class Meta:
        abstract = True


class Enrollment(Interact):
    completion = models.BooleanField(default=False)


class Review(Interact):
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], default=1)
    
    def __str__(self):
        return f"{self.rating} ⭐"
    
    
class Comment(Interact):
    content = models.CharField(max_length=255)
    
    
class Order(models.Model):
    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        PAID = "PAID", "Paid"
        CANCELLED = "CANCELLED", "Cancelled"
        
    class Methods(models.TextChoices):
        UPI = "UPI", "UPI - Unified Payments Interface"
        OTC = "OTC", "OTC - Over-the-Counter Payment"
        
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    total_quantity = models.IntegerField(default=0)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    methods = models.CharField(max_length=20, choices=Methods.choices, default=Methods.OTC)
    date_created = models.DateTimeField(auto_now_add=True)
    
    courses = models.ManyToManyField(Course, through='OrderItem')
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    @property
    def total_price(self):
        return sum(item.subtotal for item in self.orderitem_set.all())
    
    def update_totals(self):
        self.total_quantity = sum(item.quantity for item in self.orderitem_set.all())
        self.total_price = sum(item.subtotal for item in self.orderitem_set.all())
        self.save(update_fields=['total_quantity', 'total_price'])
        
    def __str__(self):
        return f"Order {self.pk} - {self.status}"
        
        
class OrderItem(models.Model):
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00) 
    
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ['order', 'course']
    
    @property
    def subtotal(self):
        return self.quantity * self.price
    
    def __str__(self):
        return f"{self.course} x {self.quantity}"