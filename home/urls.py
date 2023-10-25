from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("Blackjack/", views.blackjack, name="Blackjack"),
    path("Slots/", views.slots, name="Slots"),
    path("Wheel/", views.wheel, name="Wheel"),
]
