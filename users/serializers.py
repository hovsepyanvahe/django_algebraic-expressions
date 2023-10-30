from django.contrib.auth.models import User
from rest_framework import serializers

from .models import AlgebraicExpression


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class ExpressionSerializer(serializers.Serializer):
    expression = serializers.CharField(required=True, allow_null=False)


class AlgebraicExpressionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlgebraicExpression
        fields = ('id', 'expression', 'result', 'created_at')
