from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import ExpenseViewSet, IncomeViewSet, BillViewSet, SavingsGoalViewSet

router = DefaultRouter()
router.register(r'expenses', ExpenseViewSet)
router.register(r'incomes', IncomeViewSet)
router.register(r'bills', BillViewSet)
router.register(r'savings-goals', SavingsGoalViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
