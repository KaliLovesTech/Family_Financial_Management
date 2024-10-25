from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import InvestmentViewSet, PortfolioViewSet

router = DefaultRouter()
router.register(r'investments', InvestmentViewSet)
router.register(r'portfolios', PortfolioViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
