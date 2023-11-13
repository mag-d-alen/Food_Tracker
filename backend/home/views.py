from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import FoodItem, Meal
from .serializers import FoodItemSerializer, MealSerializer, MyTokenObtainPairSerializer, RegisterSerializer


# Create your views here.

class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)


class FoodItemView(viewsets.ModelViewSet):
    serializer_class = FoodItemSerializer
    queryset = FoodItem.objects.all().order_by('-created_at')


class MealView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = MealSerializer
    filter_backends = [DjangoFilterBackend]

    def get_queryset(self):
        user = self.request.user
        print(user.id)
        queryset = Meal.objects.filter(user=user).order_by('-created_at')
        print(queryset)
        return queryset
