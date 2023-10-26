from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Game
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm

def index(request):
    games_list = Game.objects.order_by("gamename")
    context = {"games_list" : games_list}
    return render(request, "home/index.html", context)

def blackjack(request):
    return HttpResponse("This is blackjack!")

def slots(request):
    return HttpResponse("This is slots!")

def wheel(request):
    return HttpResponse("This is the free credit wheel!")

def signup(request):

    if request.user.is_authenticated:
        return redirect('/home')

    if request.method == 'POST':
        form = UserCreationForm(request.POST)

        if form.is_valid():
            form.save()
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            user = authenticate(username = username,password = password)
            login(request, user)
            return redirect('/home')

        else:
            return render(request,'home/signup.html',{'form':form})

    else:
        form = UserCreationForm()
        return render(request,'home/signup.html',{'form':form})


def signin(request):
    if request.user.is_authenticated:
        return redirect('/home')

    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username =username, password = password)

        if user is not None:
            login(request,user)
            return redirect('/home')
        else:
            form = AuthenticationForm()
            return render(request,'home/signin.html',{'form':form})

    else:
        form = AuthenticationForm()
        return render(request, 'home/signin.html', {'form':form})


def signout(request):
    logout(request)
    return redirect('/home')
