from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    balance = models.DecimalField(max_digits=19, decimal_places=2)
    account_created = models.DateTimeField("account creation date")

    def __str__(self):
        return self.username

class Game(models.Model):
    gamename = models.CharField(max_length=50)

    def __str__(self):
        return self.gamename
