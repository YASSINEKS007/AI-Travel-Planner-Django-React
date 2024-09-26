from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework import status
import json
from .all_crews import execute_crews
# Create your views here.


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def generate_plan(request):
    user = request.user
    data = json.loads(request.body)
    origin = data.get("origin").upper()
    destination = data.get("destination").upper()
    budget = data.get("budget")
    adults = data.get("adults")
    departure = data.get("departure")
    return_date = data.get("arrival")
    criteria = data.get("criteria")
    
    print(departure)
    print("*************************************************")

    flight_data, activities_data, restaurants_data = execute_crews(
        criteria=criteria, city_origin=origin, city_destination=destination, departure_date=departure, return_date=return_date, adults=adults)

    print(flight_data)
    print("********************")
    print(restaurants_data)
    print("******************")
    print(activities_data)

    return Response({"message": "well done"}, status=status.HTTP_200_OK)
