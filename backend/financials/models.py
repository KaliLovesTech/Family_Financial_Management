from django.db import models
from budgeting.models import Budget  # Import Budget model
from django.utils import timezone

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name

class Expense(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(default=timezone.now)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE, related_name='expenses', null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.amount} on {self.date} - {self.category.name}"

class Income(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(default=timezone.now)
    source = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.amount} from {self.source}"

class Bill(models.Model):
    name = models.CharField(max_length=100)
    due_date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_paid = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.name} - Due on {self.due_date}"

class SavingsGoal(models.Model):
    goal_name = models.CharField(max_length=100)
    target_amount = models.DecimalField(max_digits=10, decimal_places=2)
    saved_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    due_date = models.DateField(blank=True, null=True)
    income_sources = models.ManyToManyField(Income, related_name='savings_goals', blank=True)
    
    def __str__(self):
        return f"{self.goal_name} - Target: {self.target_amount}"
