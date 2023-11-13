from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Game
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm

def index(request):
    return render(request, "home/index.html")

def blackjack(request):
    return render(request, "home/blackjack.html")

def slots(request):
    return render(request, "home/slots.html")

def wheel(request):
    return render(request, "home/wheelgame.html")

def addcredits(request):
    return render(request, "home/addcredits.html")

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
