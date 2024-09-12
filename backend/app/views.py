from rest_framework import status
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
import json
from .models import CustomUser


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def test(request):
    return Response({"message": "test with success"}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")
            firstName = data.get("firstName")
            lastName = data.get("lastName")

            if not email or not password:
                return Response(
                    {"error": "Email and password are required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user = CustomUser.objects.filter(email=email).first()
            if user is not None:
                return Response(
                    {"error": "User Already Exists"},
                    status=status.HTTP_409_CONFLICT,
                )

            CustomUser.objects.create_user(
                email=email,
                password=password,
                firstName=firstName,
                lastName=lastName
            )

            return Response(
                {"message": "User created successfully"}, status=status.HTTP_201_CREATED
            )

        except json.JSONDecodeError:
            return Response(
                {"error": "Invalid JSON"}, status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    return Response(
        {"error": "POST method required"}, status=status.HTTP_400_BAD_REQUEST
    )
