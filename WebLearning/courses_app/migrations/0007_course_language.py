# Generated by Django 2.2.2 on 2019-06-29 13:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('courses_app', '0006_auto_20190629_1638'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='language',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='courses', to='courses_app.Language'),
        ),
    ]