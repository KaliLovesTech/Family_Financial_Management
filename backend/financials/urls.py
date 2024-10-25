from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import ExpenseViewSet, IncomeViewSet, BillViewSet, SavingsGoalViewSet
from . import views

router = DefaultRouter()
router.register(r'expenses', ExpenseViewSet)
router.register(r'incomes', IncomeViewSet)
router.register(r'bills', BillViewSet)
router.register(r'savings-goals', SavingsGoalViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('recurring_expenses/', views.get_recurring_expenses, name='recurring_expenses'),
]
