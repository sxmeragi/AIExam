from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils import timezone


class User(AbstractUser):
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)
    bio = models.TextField(blank=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    birth_date = models.DateField(blank=True, null=True)
    gender = models.CharField(
        max_length=10, choices=[("male", "Мужской"), ("female", "Женский")], blank=True
    )
    date_joined = models.DateTimeField(default=timezone.now)

    groups = models.ManyToManyField(
        Group,
        related_name="customuser_set",
        blank=True,
        help_text="Группы, к которым принадлежит пользователь.",
        related_query_name="customuser",
    )

    user_permissions = models.ManyToManyField(
        Permission,
        related_name="customuser_set",
        blank=True,
        help_text="Конкретные права доступа пользователя.",
        related_query_name="customuser",
    )

    def __str__(self):
        return self.username or self.email


class NFT(models.Model):
    STATUS_CHOICES = [
        ("on_sale", "В продаже"),
        ("sold", "Продано"),
        ("hidden", "Скрыто"),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="nfts/")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    creator = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="created_nfts"
    )
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owned_nfts")
    category = models.CharField(max_length=100, blank=True)
    tags = models.CharField(max_length=255, blank=True)
    collection = models.CharField(max_length=100, blank=True)
    metadata_url = models.URLField(blank=True, null=True)
    views = models.IntegerField(default=0)
    sales_count = models.IntegerField(default=0)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="on_sale")
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.name} by {self.creator.username}"
