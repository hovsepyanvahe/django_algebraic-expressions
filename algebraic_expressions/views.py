from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, status

from .helpers import evaluate_expression
from .serializers import ExpressionSerializer


class ExpressionView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ExpressionSerializer

    def get(self, request):
        data = {
            'test': 'test'
        }

        return Response(data)

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        expression = serializer.validated_data['expression']

        result = evaluate_expression(expression)

        return Response({"result": result}, status=status.HTTP_200_OK)
