from django.db import models
from django.contrib.auth.models import User


class AlgebraicExpression(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    expression = models.TextField(null=True)
    result = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
