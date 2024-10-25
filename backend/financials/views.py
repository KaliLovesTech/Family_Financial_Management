# backend/financials/views.py
from datetime import timedelta
from django.utils import timezone
from django.db.models import Count
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Expense

@api_view(['GET'])
def get_recurring_expenses(request):
    # Get the current date and calculate a threshold for recurring (e.g., within the last 90 days)
    threshold_date = timezone.now() - timedelta(days=90)
    
    # Filter expenses occurring within the last 90 days
    expenses = (
        Expense.objects
        .filter(date__gte=threshold_date)
        .values('description')
        .annotate(count=Count('id'))
        .filter(count__gt=1)
    )

    recurring_expenses = []
    for expense in expenses:
        recurring_expenses.append({
            'description': expense['description'],
            'count': expense['count']
        })

    return Response(recurring_expenses)
