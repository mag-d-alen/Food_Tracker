from django.shortcuts import render
from django.shortcuts import render
from rest_framework import viewsets

from .models import FoodItem
from .serializers import FoodItemSerializer


# Create your views here.

class FoodItemView(viewsets.ModelViewSet):
    serializer_class = FoodItemSerializer
    queryset = FoodItem.objects.all()

