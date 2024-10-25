from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import BudgetViewSet, ExpenseCategoryViewSet

router = DefaultRouter()
router.register(r'budgets', BudgetViewSet)
router.register(r'expense-categories', ExpenseCategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
