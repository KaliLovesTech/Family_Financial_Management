from django.test import TestCase
from .models import Budget, ExpenseCategory

class BudgetModelTests(TestCase):
    def setUp(self):
        # Create ExpenseCategory
        self.category = ExpenseCategory.objects.create(name="Utilities")

    def test_create_budget(self):
        # Test creating a budget with an expense category
        budget = Budget.objects.create(name="Quarterly Budget", total_amount=3000, start_date="2024-01-01", end_date="2024-03-31")
        budget.categories.add(self.category)
        self.assertEqual(budget.name, "Quarterly Budget")
        self.assertIn(self.category, budget.categories.all())
