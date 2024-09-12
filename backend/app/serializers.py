from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import datetime


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["firstName"] = user.firstName
        token["lastName"] = user.lastName
        token["email"] = user.email
        token["date_joined"] = int((user.date_joined).timestamp())

        return token
