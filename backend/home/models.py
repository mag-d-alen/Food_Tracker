from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.auth.models import AbstractUser, User
from django.db.models import CASCADE

# Create your models here.

UNITCHOICES = (
    ('GR', '100 gram'),
    ('PC', '1 piece'),
    ('TBS', '1 table spoon'),
    ('ML', '100 ml'),
    ('C', '1 cup')
)


class FoodItem(models.Model):
    name = models.CharField(unique=True, max_length=200, null=False, blank=False)
    kcal = models.PositiveIntegerField(null=False, blank=False)
    unit = models.CharField(max_length=5, choices=UNITCHOICES, default='GR')
    qty = models.DecimalField(null=False, blank=True, default=1, max_digits=6, decimal_places=2)

    @property
    def total_kcal(self):
        return (self.qty * self.kcal) or self.kcal

    def __str__(self) -> str:
        return self.name




class Meal(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=CASCADE)
    food_items = models.ManyToManyField(FoodItem, related_name='food_items')

    @property
    def total_meal_kcal(self):
        total = 0
        if self.food_items.all():
            for food_item in self.food_items.all():
                total += food_item.total_kcal
        return total

    def __str__(self) -> str:
        return self.name
