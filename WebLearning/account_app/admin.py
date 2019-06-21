from django.contrib import admin
from .models import CustomUser
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm


class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    form = CustomUserChangeForm
    list_display = ('id', 'username', 'email', 'email_confirmed')
    ordering = ('id',)
    fieldsets = UserAdmin.fieldsets + (
        ('Email confirmation', {'fields': ('email_confirmed',)}),
    )



