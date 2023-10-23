from django.contrib import admin
from django.contrib.auth.models import User

from home.models import FoodItem, Meal, MealFoodItem


# Register your models here.
class FoodItemAdmin(admin.ModelAdmin):
    model: FoodItem
    list_display = ('name', 'kcal', 'unit')
    # def get_total_kcal(self):
    #     return self.total_kcal


class MealAdmin(admin.ModelAdmin):
    model: Meal
    list_display = ('name', 'user', 'created_at', 'display_food_items', 'total_meal_kcal')

    def total_meal_kcal(self, obj):
        return obj.total_meal_kcal

    def display_food_items(self, obj):
        return ", ".join([item.name for item in obj.food_items.all()])
    display_food_items.short_description = 'Food Items'


class MealFoodItemAdmin(admin.ModelAdmin):
    model: MealFoodItem
    list_display = ('food_item', 'meal', 'qty', 'total_kcal')


admin.site.register(FoodItem, FoodItemAdmin)
admin.site.register(Meal, MealAdmin)
admin.site.register(MealFoodItem, MealFoodItemAdmin)
