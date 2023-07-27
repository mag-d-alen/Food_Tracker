from django.contrib import admin

from home.models import FoodItem


# Register your models here.
class FoodItemAdmin(admin.ModelAdmin):
    model: FoodItem
    list_display = ('name', 'kcal', 'unit')

admin.site.register(FoodItem, FoodItemAdmin)