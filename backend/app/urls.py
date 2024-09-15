from django.urls import path
from .views import test, register, update_user, get_profile_picture
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path("", test, name="test"),
    path("auth/register/", register, name="register"),
    path("auth/me/", update_user, name="update_user"),
    path("profile-picture/", get_profile_picture, name="get_profile_picture"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
