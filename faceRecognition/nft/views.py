from flask import views
from rest_framework import generics, permissions, status, viewsets
from django_filters.rest_framework import DjangoFilterBackend
from .models import NFT
from rest_framework.decorators import action
from django.db import transaction
from rest_framework.response import Response
from django.http.response import JsonResponse
from .serializer import NFTSerializer, RegisterSerializer, UserSerializer
from rest_framework.views import APIView


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class ProtectedView(generics.views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(
            {"message": f"Привет, {request.user.username}! Ты авторизован через JWT."}
        )


class UserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user, context={"request": request})
        return Response(serializer.data)

    def patch(self, request):
        serializer = UserSerializer(
            request.user, data=request.data, partial=True, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NFTViewSet(viewsets.ModelViewSet):
    queryset = NFT.objects.all().order_by("-created_at")
    serializer_class = NFTSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filterset_fields = ["status"]
    filter_backends = [DjangoFilterBackend]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user, owner=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        nft = self.get_object()
        nft.views += 1
        nft.save()
        return super().retrieve(request, *args, **kwargs)

    @action(
        detail=True,
        methods=["post"],
        permission_classes=[permissions.IsAuthenticated],
        name="Purchase NFT",
    )
    @transaction.atomic
    def purchase(self, request, pk=None):
        nft = self.get_object()
        buyer = request.user

        if nft.owner == buyer:
            return Response({"error": "Вы уже владелец этого NFT."}, status=400)

        if nft.status != "on_sale":
            return Response({"error": "Этот NFT не доступен для покупки."}, status=400)

        if buyer.balance < nft.price:
            return JsonResponse({"error": "У вас недостаточно средств."}, status=400)

        seller = nft.owner
        buyer.balance -= nft.price
        seller.balance += nft.price
        buyer.save()
        seller.save()

        nft.owner = buyer
        nft.status = "sold"
        nft.sales_count += 1
        nft.save()

        return Response({"success": "NFT успешно куплен!"}, status=200)

    @action(
        detail=False, methods=["get"], permission_classes=[permissions.IsAuthenticated]
    )
    def my_nfts(self, request):
        owned = NFT.objects.filter(owner=request.user)
        created = NFT.objects.filter(creator=request.user)
        return Response(
            {
                "owned": NFTSerializer(owned, many=True).data,
                "created": NFTSerializer(created, many=True).data,
            }
        )
