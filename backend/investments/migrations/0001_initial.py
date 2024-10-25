# Generated by Django 5.1.2 on 2024-10-25 15:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Investment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('investment_type', models.CharField(choices=[('STOCK', 'Stock'), ('BOND', 'Bond'), ('CRYPTO', 'Cryptocurrency'), ('MUTUAL_FUND', 'Mutual Fund')], max_length=20)),
                ('purchase_date', models.DateField()),
                ('purchase_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('current_value', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Portfolio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('investments', models.ManyToManyField(related_name='portfolios', to='investments.investment')),
            ],
        ),
    ]
