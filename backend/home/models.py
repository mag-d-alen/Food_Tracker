from django.db import models
from django.contrib.auth.models import AbstractUser, User

# Create your models here.

UNITCHOICES = (
    ('GR', '100 gram'),
    ('PC', '1 piece'),
    ('TBS', '1 table spoon'),
    ('ML', '100 ml'),
    ('C', '1 cup')
)


class FoodItem(models.Model):
    name = models.CharField(max_length=200)
    kcal = models.DecimalField(max_digits=5, decimal_places=2)
    unit = models.CharField(max_length=5, choices=UNITCHOICES, default='GR')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Meal(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Assuming you have a User model
    food_items = models.ManyToManyField(FoodItem, through='MealFoodItem')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    @property
    def total_meal_kcal(self):
        total_kcal = 0
        for meal_food_item in self.mealfooditem_set.all():
            total_kcal += meal_food_item.total_kcal
        return total_kcal


class MealFoodItem(models.Model):
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE)
    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE)
    qty = models.DecimalField(max_digits=5, decimal_places=2)
    total_kcal = models.DecimalField(max_digits=8, decimal_places=2)

    @property
    def total_kcal(self):
        return self.food_item.kcal * self.qty or self.food_item.kcal

    # def save(self, *args, **kwargs):
    #     # self.total_kcal = self.food_item.kcal * self.qty
    #     super(MealFoodItem, self).save(*args, **kwargs)
