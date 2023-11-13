from django.contrib.auth.models import User
from rest_framework import serializers

from home.models import FoodItem, Meal, MealFoodItem
from rest_framework.exceptions import ValidationError
from rest_framework.fields import CharField
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def __str__(self):
        return self.id


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        token['username'] = user.username
        token['id'] = user.id
        return token

    @classmethod
    def validate(self, attrs):
        data = super().validate(attrs)
        data.update({
            'user_id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
        })
        return data


class RegisterSerializer(serializers.ModelSerializer):
    password = CharField(write_only=True)
    password2 = CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')

    def validate(self, data):
        if data['password'] != data['password2']:
            raise ValidationError('Passwords do not match')
        return data

    def create(self, validated_data):
        user = User.objects.create(username=validated_data['username'], email=validated_data['email'],
                                   password=validated_data['password'])
        user.save()
        return user


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
        fields = ('id', 'food_items', 'name', 'total_meal_kcal', 'created_at')

    def to_representation(self, obj):
        qs = MealFoodItem.objects.filter(meal=obj.id)
        ret = super().to_representation(obj)
        ret["food_items"] = MealFoodItemSerializer(instance=qs, many=True).data
        return ret

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()

        food_items_data = self.context['request'].data.get('food_items', [])
        instance.mealfooditem_set.all().delete()

        for item in food_items_data:
            MealFoodItem.objects.create(meal=Meal.objects.get(id=item["meal"]), qty=item["qty"],
                                        food_item=FoodItem.objects.get(id=item["food_item"]["id"]))
        return instance
