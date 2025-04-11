from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils import timezone
class User(AbstractUser):
    ROLE_CHOICES = [
        ('director', 'Директор'),
        ('worker', 'Работник'),
        ('guest', 'Гость'),
    ]
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='guest')
    date_joined = models.DateTimeField(default=timezone.now)
    

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',  # Уникальное имя для связей
        blank=True,
        help_text='The groups this user belongs to.',
        related_query_name='customuser'
    )


    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_set',  # Уникальное имя для разрешений
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='customuser'
    )



    def __str__(self):
        return self.first_name

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name
