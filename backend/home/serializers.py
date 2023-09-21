from rest_framework import serializers

from home.models import FoodItem, Meal


class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = ('id', 'name', 'kcal', 'unit', 'total_kcal', 'qty')


class MealSerializer(serializers.ModelSerializer):
    food_items = FoodItemSerializer(read_only=False, many=True)
    class Meta:
        model = Meal
        fields = ('id', 'name', 'food_items', 'user', 'created_at','total_meal_kcal' )
