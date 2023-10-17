from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse("This will be the homepage!")

def blackjack(request):
    return HttpResponse("This is blackjack!")

def slots(request):
    return HttpResponse("This is slots!")
