# Generated by Django 4.2.6 on 2023-10-25 23:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_game'),
    ]

    operations = [
        migrations.DeleteModel(
            name='User',
        ),
    ]