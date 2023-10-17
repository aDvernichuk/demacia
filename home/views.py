from django.shortcuts import render
from django.http import HttpResponse
from .models import Game

def index(request):
    games_list = Game.objects.order_by("gamename")
    context = {"games_list" : games_list}
    return render(request, "home/index.html", context)

def blackjack(request):
    return HttpResponse("This is blackjack!")

def slots(request):
    return HttpResponse("This is slots!")
