from django.shortcuts import render
from .models import User, Product
from rest_framework import serializers, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "role"]


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

    def create(self, validated_data):
        validated_data.pop("added_by", None)
        return super().create(validated_data)
