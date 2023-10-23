from django.contrib.auth.models import User
from rest_framework import serializers

from home.models import FoodItem, Meal, MealFoodItem
from rest_framework.relations import PrimaryKeyRelatedField


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = ('id', 'name', 'kcal', 'unit')


class MealFoodItemSerializer(serializers.ModelSerializer):
    food_item = FoodItemSerializer()
    qty = serializers.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        model = MealFoodItem
        fields = ('id', 'food_item', 'qty', 'total_kcal', 'meal')


class MealSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        fields = ('id', 'food_items', 'name', 'user', 'total_meal_kcal', 'created_at')

    def to_representation(self, obj):
        qs = MealFoodItem.objects.filter(meal=obj.id)
        ret = super().to_representation(obj)
        ret["food_items"] = MealFoodItemSerializer(instance=qs, many=True).data
        return ret

    # def create(self, validated_data):
    #     print("creating", str(validated_data))
    #     # Create the Meal instance
    #     data = validated_data.pop('food_items')
    #     print(data)
    #     MealFoodItem.objects.create()
    #     meal.save()
    #
    #     # Handle food_items
    #     food_items_data = self.context['request'].data.get('food_items', [])
    #     for food_item_data in food_items_data:
    #         # Create MealFoodItem instances related to the Meal
    #         MealFoodItem.objects.create(meal=meal, **food_item_data)
    #
    #     return meal

    def update(self, instance, validated_data):

        instance.name = validated_data.get('name', instance.name)
        instance.user = validated_data.get('user', instance.user)
        instance.save()

        food_items_data = self.context['request'].data.get('food_items', [])
        instance.mealfooditem_set.all().delete()

        for item in food_items_data:
            MealFoodItem.objects.create(meal=Meal.objects.get(id=item["meal"]), qty=item["qty"],food_item=FoodItem.objects.get(id=item["food_item"]["id"]))
        return instance
