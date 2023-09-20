from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

UNITCHOICES = (
    ('GR', '100 gram'),
    ('PC', '1 piece'),
    ('TBS', '1 table spoon'),
    ('ML', '100 ml'),
    ('C', '1 cup')
)
    


class FoodItem(models.Model):
    name = models.CharField(max_length=200, null=False, blank=False)
    kcal = models.PositiveIntegerField(null=False, blank=False)
    unit = models.CharField(max_length=5, choices=UNITCHOICES, default='GR')

    def __str__(self) -> str:
        return self.name
