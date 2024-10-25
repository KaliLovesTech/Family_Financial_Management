# backend/investments/tests.py
from django.test import TestCase
from .models import Investment, Portfolio
from budgeting.models import Budget
from datetime import date

class InvestmentModelTests(TestCase):
    def setUp(self):
        # Create Budget with required fields
        self.budget = Budget.objects.create(
            name="Retirement Fund",
            total_amount=10000,
            start_date=date(2024, 1, 1),
            end_date=date(2024, 12, 31),
        )

    def test_create_investment(self):
        # Test creating an investment linked to a budget
        investment = Investment.objects.create(
            name="Tesla",
            investment_type="STOCK",
            purchase_date="2024-01-01",
            purchase_price=800,
            current_value=1000,
            budget=self.budget
        )
        self.assertEqual(investment.name, "Tesla")
        self.assertEqual(investment.budget, self.budget)
        self.assertEqual(investment.current_value, 1000)

    def test_create_portfolio_with_investments(self):
        # Test creating a portfolio with multiple investments
        portfolio = Portfolio.objects.create(name="Growth Portfolio")
        investment1 = Investment.objects.create(name="Apple", investment_type="STOCK", purchase_date="2024-01-10", purchase_price=150, current_value=200)
        investment2 = Investment.objects.create(name="Microsoft", investment_type="STOCK", purchase_date="2024-02-15", purchase_price=250, current_value=300)
        portfolio.investments.set([investment1, investment2])
        self.assertIn(investment1, portfolio.investments.all())
        self.assertIn(investment2, portfolio.investments.all())
