from django.contrib import admin
from .models import User, NFT
from django.contrib.auth.admin import UserAdmin

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Дополнительно', {'fields': ('avatar', 'bio', 'balance', 'birth_date', 'gender')}),
    )

@admin.register(NFT)
class NFTAdmin(admin.ModelAdmin):
    list_display = ('name', 'creator', 'owner', 'price', 'status', 'created_at')
    search_fields = ('name', 'creator__username', 'owner__username', 'category', 'tags')
    list_filter = ('status', 'category', 'created_at')
