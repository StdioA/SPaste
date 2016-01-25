# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-01-25 01:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Paste',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('paste_hash', models.CharField(max_length=6)),
                ('content', models.TextField()),
                ('create_time', models.DateTimeField(verbose_name='Create time')),
                ('modified_time', models.DateTimeField(verbose_name='Last Modified')),
            ],
        ),
    ]
