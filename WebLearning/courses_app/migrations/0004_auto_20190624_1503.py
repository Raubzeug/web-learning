# Generated by Django 2.2.2 on 2019-06-24 12:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('courses_app', '0003_auto_20190624_1459'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='language',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='courses', to='courses_app.Language'),
        ),
    ]
