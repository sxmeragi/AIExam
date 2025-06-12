from django.urls import path, include
from .views import RegisterView, ProtectedView, NFTViewSet, UserProfileView
from rest_framework.routers import DefaultRouter

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r"nfts", NFTViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path("register/", RegisterView.as_view(), name="register"),
    path("protected/", ProtectedView.as_view(), name="protected"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("user/me/", UserProfileView.as_view(), name="user-profile"),
]
