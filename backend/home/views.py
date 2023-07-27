from django.shortcuts import render
from django.shortcuts import render
from rest_framework import viewsets

from home.serializers import FoodItemSerializer
from .models import FoodItem

# Create your views here.

class FoodItemView(viewsets.ModelViewSet):
    serializer_class = FoodItemSerializer
    queryset = FoodItem.objects.all()