from django.db import models

# Create your models here.
class Game(models.Model):
    gamename = models.CharField(max_length=50)

    def __str__(self):
        return self.gamename
