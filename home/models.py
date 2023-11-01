from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    credits = models.DecimalField(max_digits=22, decimal_places=2)

class Game(models.Model):
    gamename = models.CharField(max_length=50)

    def __str__(self):
        return self.gamename
