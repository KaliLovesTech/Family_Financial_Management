from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name

class Expense(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.amount} on {self.date} - {self.category.name}"

class Income(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
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
    
    def __str__(self):
        return f"{self.goal_name} - Target: {self.target_amount}"
