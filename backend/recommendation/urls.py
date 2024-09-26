from django.urls import path, include
from .views import generate_plan

urlpatterns = [
    path("generate-plan/", generate_plan, name="recommendation")
]
