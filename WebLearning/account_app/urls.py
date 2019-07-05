from django.urls import path
from . import views

urlpatterns = [
    path('registration/', views.RegistrationView.as_view(), name='user_create'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('user/', views.UserDetailsView.as_view(), name='user_details'),
    path('verify/<uuid>/', views.verify, name='verify'),
    path('verification_successfull', views.verification_successfull, name='verification_successfull'),
]