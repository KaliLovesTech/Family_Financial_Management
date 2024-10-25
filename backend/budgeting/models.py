from django.db import models

class ExpenseCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name

class Budget(models.Model):
    name = models.CharField(max_length=100)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    categories = models.ManyToManyField(ExpenseCategory, related_name='budgets')

    def __str__(self):
        return f"{self.name} Budget"
