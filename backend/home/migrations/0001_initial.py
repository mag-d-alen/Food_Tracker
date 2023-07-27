# Generated by Django 4.2.3 on 2023-07-27 12:13

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FoodItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('kcal', models.PositiveIntegerField()),
                ('unit', models.CharField(choices=[('GR', '100 gram'), ('PC', 'piece'), ('TBS', 'table spoon'), ('ML', 'ml'), ('C', 'cup')], default='GR', max_length=5)),
            ],
        ),
    ]
