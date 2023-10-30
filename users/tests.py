from django.contrib.auth.models import User
from django.test import TestCase

from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.authtoken.models import Token

from .models import AlgebraicExpression
from .helpers import evaluate_expression


class UserTestCase(TestCase):

    def test_evaluate_expression(self):
        # Test case 1: Simple addition
        assert evaluate_expression("2 + 3") == 5

        # Test case 2: Absolute value and multiplication
        assert evaluate_expression("abs(-5) * 4") == 20

        # Test case 3: Length of a string and division
        assert evaluate_expression("len('hello') / 2") == 2.5

        # Test case 4: Division by zero
        assert evaluate_expression("5 / 0") == "Error: division by zero"

        # Test case 5: Invalid characters
        assert evaluate_expression("2 + @ 3") == "Error: Invalid characters in the expression"


class ExpressionTestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.token = Token.objects.create(user=self.user)
        self.url = '/user/expression/'

    def test_post_valid_expression(self):
        data = {'expression': '2 + 3 * 4'}
        response = self.client.post(self.url, data, format='json', HTTP_AUTHORIZATION=f'Token {self.token}')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['result'], 14)

        # Check if the result is saved in the database
        expression = AlgebraicExpression.objects.get(user=self.user)
        self.assertEqual(expression.expression, '2 + 3 * 4')
        self.assertEqual(expression.result, '14')

    def test_post_invalid_expression(self):
        data = {'expression': '2 + @ 3'}
        response = self.client.post(self.url, data, format='json', HTTP_AUTHORIZATION=f'Token {self.token}')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('Invalid characters', response.data['result'])

    def test_post_division_by_zero(self):
        data = {'expression': '5 / 0'}
        response = self.client.post(self.url, data, format='json', HTTP_AUTHORIZATION=f'Token {self.token}')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('division by zero', response.data['result'])
