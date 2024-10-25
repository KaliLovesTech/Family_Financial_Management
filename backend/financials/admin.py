from django.contrib import admin
from .models import Expense, Income, Bill, SavingsGoal, Category

class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('amount', 'date', 'category', 'budget')

admin.site.register(Expense, ExpenseAdmin)
admin.site.register(Income)
admin.site.register(Bill)
admin.site.register(SavingsGoal)
admin.site.register(Category)
