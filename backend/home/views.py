from django.shortcuts import render
from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated

from .models import FoodItem, Meal
from .serializers import FoodItemSerializer, MealSerializer


# Create your views here.

class FoodItemView(viewsets.ModelViewSet):
    serializer_class = FoodItemSerializer
    queryset = FoodItem.objects.all()

class MealView(viewsets.ModelViewSet):
    serializer_class = MealSerializer
    # permission_classes = [IsAuthenticated]
    queryset = Meal.objects.all()