import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import Group
from django.http import Http404, HttpResponse
from django.shortcuts import redirect

from account_app.models import CustomUser as User
from rest_framework import viewsets, generics, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser

from .serializers import UserSerializer, GroupSerializer, RegistrationSerializer, LoginSerializer, LogoutSerializer


def verify(request, uuid):
    try:
        user = User.objects.get(verification_uuid=uuid, email_confirmed=False)
    except User.DoesNotExist:
        raise Http404("User does not exist or is already verified")
    user.email_confirmed = True
    user.save()
    return redirect('verification_successfull')


def verification_successfull(request):
    return HttpResponse("<html><body>You have confirmed your email successfully.</body></html>")


class UserViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminUser,)
    queryset = User.objects.all().order_by('-date_joined').prefetch_related('courses', 'groups')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAdminUser,)
    queryset = Group.objects.all().prefetch_related('user_set')
    serializer_class = GroupSerializer


class RegistrationView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer


class LoginView(APIView):
    serializer_class = LoginSerializer

    def get(self, request):
        request.auth
        user = request.user
        if not user or not user.id:
            return Response({'message': 'you are not logged in'})
        return Response({'message': f'you are already logged in as {user}'})

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if not user:
            return Response({'error': 'wrong credentials'}, status=status.HTTP_400_BAD_REQUEST)
        if not user.email_confirmed:
            return Response({'error': 'You must confirm your email'}, status=status.HTTP_400_BAD_REQUEST)
        if user.is_active:
            token, created = Token.objects.get_or_create(user=user)
            login(request, user)
            return Response({'token': user.auth_token.key})
        return Response({'error': 'something goes wrong'}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    serializer_class = LogoutSerializer

    def get(self, request):
        request.auth
        user = request.user
        if not user or not user.id:
            return Response({'message': 'you are not logged in'})
        return Response({'message': f'you are logged in as {user}'})

    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        if serializer.is_valid() and serializer.data['logout'] == True:
            logout(request)
            return Response('Logout successful', status=status.HTTP_200_OK)
        return Response('No action applied', status=status.HTTP_200_OK)


class UserDetailsView(APIView):
    def get(self, request):
        request.auth
        user = request.user
        if not user or not user.id:
            return Response({'message': 'you are not logged in'})
        serializer = UserSerializer(user, context={'request': request})
        return Response(serializer.data)