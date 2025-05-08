from django.urls import path
from . import views


urlpatterns = [
    path("recognize/", views.recognize_face_view),
    path("products/", views.list_products),
    path("products/add/", views.add_product),
    path("employees/count/", views.count_employees),
    path("user/role", views.get_user_role),
]
