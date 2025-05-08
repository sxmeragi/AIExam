from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Product, User
from rest_framework.permissions import IsAuthenticated
from .serializers import ProductSerializer
from deepface import DeepFace
import os
from django.http import request
from .recognition import *


@api_view(["POST"])
@permission_classes([AllowAny])
def recognize_face_view(request):
    image_file = request.FILES.get("image")
    if not image_file:
        return Response({"error": "No image provided"}, status=400)

    temp_path = "temp_uploaded_image.jpg"
    with open(temp_path, "wb+") as destination:
        for chunk in image_file.chunks():
            destination.write(chunk)

    role, accuracy = recognize_face_with_deepface(temp_path)
    os.remove(temp_path)
    if role and accuracy >= 70:
        return Response({"role:": role, "accuracy:": accuracy})
    return Response({"error:": "Role unrecognized", "accuracy:": accuracy}, status=403)


@api_view(["GET"])
def list_products(request):
    products = Product.objects.all()
    return Response(ProductSerializer(products, many=True).data)


@api_view(["POST"])
def add_product(request):
    role = request.user.role
    if role == "worker" or role == "director":
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(added_by=request.user)
            return Response({"status": "Product has been added"})
    return Response({"error": "Acces denied"}, status=403)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def edit_product(request, product_id):
    if request.user.role != "worker":
        return Response({"error": "Нет прав для редактирования"}, status=403)

    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Товар не найден"}, status=404)

    serializer = ProductSerializer(product, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_product(request, product_id):
    """
    Удаление товара — доступно только работникам
    """
    if request.user.role != "worker":
        return Response({"error": "Нет прав для удаления"}, status=403)

    try:
        product = Product.objects.get(id=product_id)
        product.delete()
        return Response({"status": "Удалено"}, status=204)
    except Product.DoesNotExist:
        return Response({"error": "Товар не найден"}, status=404)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def count_employees(request):
    if request.user.role == "director":
        count = User.objects.filter(role="worker").count()
        return Response({"employees": count})
    return Response({"error": "Нет доступа"}, status=403)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_role(request):
    return Response({"role": request.user.role})
