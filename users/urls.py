from django.urls import path
from .views import UserRegistration, UserLoginView, ExpressionView, UserExpressionsHistoryAPI

urlpatterns = [
    path('register/', UserRegistration.as_view(), name='user-registration'),
    path('login/', UserLoginView.as_view(), name='user-login'),

    path('expression/', ExpressionView.as_view()),
    path('expressions-history/', UserExpressionsHistoryAPI.as_view(), name='expressions-history'),

]
