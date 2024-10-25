from rest_framework import serializers
from .models import Investment, Portfolio

class InvestmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investment
        fields = '__all__'

class PortfolioSerializer(serializers.ModelSerializer):
    investments = InvestmentSerializer(many=True, read_only=True)  # Nested serialization for investments

    class Meta:
        model = Portfolio
        fields = '__all__'
