# backend/financials/tests.py
from django.test import TestCase
from .models import Expense, Income, Bill, SavingsGoal, Category
from budgeting.models import Budget
from datetime import date

class FinancialsModelTests(TestCase):
    def setUp(self):
        # Create Category, Budget, Income with required fields
        self.category = Category.objects.create(name="Food")
        self.budget = Budget.objects.create(
            name="Monthly Budget",
            total_amount=500,
            start_date=date(2024, 1, 1),
            end_date=date(2024, 1, 31),
        )
        self.income = Income.objects.create(amount=1000, source="Salary")

    def test_create_expense(self):
        # Test creating an expense with a budget and category
        expense = Expense.objects.create(amount=50, date="2024-10-25", category=self.category, budget=self.budget)
        self.assertEqual(expense.amount, 50)
        self.assertEqual(expense.category, self.category)
        self.assertEqual(expense.budget, self.budget)

    def test_create_savings_goal(self):
        # Test creating a savings goal and linking to income
        savings_goal = SavingsGoal.objects.create(goal_name="Vacation Fund", target_amount=2000)
        savings_goal.income_sources.add(self.income)
        self.assertEqual(savings_goal.target_amount, 2000)
        self.assertIn(self.income, savings_goal.income_sources.all())

    def test_bill_payment_status(self):
        # Test creating a bill and checking its payment status
        bill = Bill.objects.create(name="Electricity", due_date="2024-11-01", amount=100, is_paid=False)
        self.assertFalse(bill.is_paid)
        bill.is_paid = True
        bill.save()
        self.assertTrue(bill.is_paid)
