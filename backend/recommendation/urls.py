from django.urls import path
from .views import generate_plan, get_travel_plans

urlpatterns = [
    path("generate-plan/", generate_plan, name="recommendation"),
    path("travel-plans/", get_travel_plans, name="get_travel_plans")
]
