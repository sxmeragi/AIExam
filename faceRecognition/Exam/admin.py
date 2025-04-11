
from django.contrib import admin
from .models import Product, User
from django.contrib.auth.admin import UserAdmin



# Кастомизация отображения модели Product в админке
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'price', 'created_at')
    search_fields = ('name', 'description')
    list_filter = ('created_at',)
    ordering = ('-created_at',)


class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['username', 'first_name', 'last_name', 'role', 'email', 'is_staff', 'is_active', 'date_joined']  # Добавь поле role
    list_filter = ['role', 'is_staff', 'is_active']  # Добавь фильтрацию по роли
    search_fields = ['username', 'first_name', 'last_name', 'email']
    ordering = ['date_joined']
    
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'role')}),  # Добавь поле role сюда
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = (
        (None, {'fields': ('username', 'password1', 'password2')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'role')}),  # Добавь поле role
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )


admin.site.register(User, CustomUserAdmin)