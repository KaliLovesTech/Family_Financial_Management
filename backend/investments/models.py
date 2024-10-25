# backend/investments/models.py
from django.db import models
from budgeting.models import Budget  # Import Budget model

class Investment(models.Model):
    TYPE_CHOICES = [
        ('STOCK', 'Stock'),
        ('BOND', 'Bond'),
        ('CRYPTO', 'Cryptocurrency'),
        ('MUTUAL_FUND', 'Mutual Fund'),
    ]

    name = models.CharField(max_length=100)
    investment_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    purchase_date = models.DateField()
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2)
    current_value = models.DecimalField(max_digits=10, decimal_places=2)
    budget = models.ForeignKey(Budget, on_delete=models.SET_NULL, related_name='investments', null=True, blank=True)
    
    def __str__(self):
        return f"{self.name} ({self.investment_type})"

class Portfolio(models.Model):
    name = models.CharField(max_length=100)
    investments = models.ManyToManyField(Investment, related_name='portfolios')

    def __str__(self):
        return self.name
