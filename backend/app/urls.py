from django.urls import path
from .views import test, register


urlpatterns = [
    path("", test, name="test"),
    path("auth/register/", register, name="register"),
]
