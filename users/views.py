from django.contrib.auth import authenticate, login
from rest_framework import generics, status
from rest_framework.authtoken.models import Token
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import AlgebraicExpression
from .serializers import UserSerializer, LoginSerializer, AlgebraicExpressionSerializer
from .helpers import evaluate_expression
from .serializers import ExpressionSerializer

class UserRegistration(generics.GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user.set_password(request.data['password'])
        user.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserLoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)

            return Response({'token': token.key}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials!'}, status=status.HTTP_401_UNAUTHORIZED)


class ExpressionView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ExpressionSerializer


    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        expression = serializer.validated_data['expression']

        result = evaluate_expression(expression)

        AlgebraicExpression.objects.create(
            user=request.user,
            expression=expression,
            result=result
        )

        return Response({"result": result}, status=status.HTTP_200_OK)


class ExpressionPaginationClass(LimitOffsetPagination):
    default_limit = 10

    def get_paginated_response(self, data):
        return Response({
            'count': self.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data
        })

class UserExpressionsHistoryAPI(generics.ListAPIView):
    serializer_class = AlgebraicExpressionSerializer
    pagination_class = ExpressionPaginationClass

    def get_queryset(self):
        return AlgebraicExpression.objects.filter(user=self.request.user).order_by('-created_at')
