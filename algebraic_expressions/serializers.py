from django.contrib.auth.models import User
from rest_framework import serializers


class ExpressionSerializer(serializers.Serializer):
    expression = serializers.CharField(required=True, allow_null=False)
