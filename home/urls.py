from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("blackjack/", views.blackjack, name="blackjack"),
    path("slots/", views.slots, name="slots"),
    path("wheel/", views.wheel, name="wheel"),
]
