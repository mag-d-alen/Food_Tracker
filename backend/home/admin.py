from django.contrib import admin

from home.models import FoodItem, Meal


# Register your models here.
class FoodItemAdmin(admin.ModelAdmin):
    model: FoodItem
    list_display = ('name', 'kcal', 'unit','qty', 'total_kcal')
    # def get_total_kcal(self):
    #     return self.total_kcal


class MealAdmin(admin.ModelAdmin):
    model: Meal
    list_display = ('name', 'get_food_items', 'user', 'created_at', 'total_meal_kcal')

    def get_food_items(self, obj):
        return [food_item.name for food_item in obj.food_items.all()]


admin.site.register(FoodItem, FoodItemAdmin)
admin.site.register(Meal, MealAdmin)
