from rest_framework import serializers
from .models import NFT
from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "email", "password")

    def create(self, validated_data):
        user = User(username=validated_data["username"], balance=10)
        user.set_password(validated_data["password"])
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "avatar",
            "bio",
            "balance",
            "birth_date",
            "gender",
        ]
        read_only_fields = ["id", "email", "balance"]

    def get_avatar(self, obj):
        request = self.context.get("request")
        if obj.avatar and hasattr(obj.avatar, "url"):
            return request.build_absolute_uri(obj.avatar.url)
        return None


class NFTSerializer(serializers.ModelSerializer):
    creator_username = serializers.CharField(source="creator.username", read_only=True)
    owner_username = serializers.CharField(source="owner.username", read_only=True)

    class Meta:
        model = NFT
        fields = "__all__"
        read_only_fields = [
            "creator",
            "owner",
            "status",
            "views",
            "sales_count",
            "created_at",
        ]
