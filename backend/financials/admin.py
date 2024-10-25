from django.contrib import admin
from .models import Expense, Income, Bill, SavingsGoal, Category

admin.site.register(Expense)
admin.site.register(Income)
admin.site.register(Bill)
admin.site.register(SavingsGoal)
admin.site.register(Category)
