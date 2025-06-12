from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, NFT
from django.contrib.auth.forms import UserChangeForm


class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User
        fields = "__all__"


class UserAdmin(BaseUserAdmin):
    form = CustomUserChangeForm
    fieldsets = BaseUserAdmin.fieldsets + (
        (
            "Дополнительно",
            {"fields": ("avatar", "bio", "balance", "birth_date", "gender")},
        ),
    )
    list_display = ("username", "email", "balance", "is_staff")
    filter_horizontal = []


admin.site.register(User, UserAdmin)


@admin.register(NFT)
class NFTAdmin(admin.ModelAdmin):
    list_display = ("name", "creator", "owner", "price", "status", "created_at")
    search_fields = ("name", "creator__username", "owner__username", "category", "tags")
    list_filter = ("status", "category", "created_at")
