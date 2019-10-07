import random
from redis import ConnectionError as RedisConnectionError

from django.core.mail import send_mail
from django.urls import reverse
from django.template import Template, Context
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import Group
from django.contrib.sites.shortcuts import get_current_site
from django.http import Http404, HttpResponse
from django.shortcuts import redirect

from rest_framework import serializers
from rest_framework import viewsets, generics, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser

from .serializers import UserSerializer, GroupSerializer, RegistrationSerializer, LoginSerializer, LogoutSerializer
from .models import CustomUser as User
from .tasks import send_mail_conf


def verify(request, uuid, random_digit):
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

    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user=User.objects.get(username=serializer.data.get('username'))
        sender = 'killedandsaved@mail.ru'
        reciever = user.email
        current_site = get_current_site(request)
        subj = 'Verify your account'
        random_digit = random.randint(1, 1000000)
        message = """Follow this link to verify your account: http://{0}{1}""" \
            .format(current_site,
                    reverse('verify', kwargs={'uuid': str(user.verification_uuid), 'random_digit': random_digit}))

        html_message = Template("""
                    <!DOCTYPE html>
                    <html>
                        <head>
                        </head>
                        <body>
                            <p>Follow this link to verify your account: 
                                <a href='http://{{ current_site }}{{ ver_link }}{{ random_digit }}'>verification link</a>
                            </p>
                        </body>
                    </html>
                    """)
        c = Context({'current_site': current_site, 'ver_link': reverse('verify', kwargs={'uuid': str(user.verification_uuid),
                                                           'random_digit': random_digit,
                                                           })})
        try:
            send_mail_conf.delay(sender, reciever, subj, message, html_message=html_message.render(c))
        except RedisConnectionError:
            send_mail(subj, message, sender, [reciever], fail_silently=True, html_message=html_message.render(c))
        return Response(serializer.data, status=status.HTTP_201_CREATED)

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
        return Response('No action applied', status=status.HTTP_400_BAD_REQUEST )


class UserDetailsView(APIView):
    serializer_class = UserSerializer

    def get(self, request):
        request.auth
        user = request.user
        if not user or not user.id:
            return Response({'message': 'you are not logged in'}, status=401)
        serializer = UserSerializer(user, context={'request': request})
        return Response(serializer.data)

    def put(self, request):
        request.auth
        user = request.user
        if not user or not user.id:
            return Response({'message': 'you are not logged in'})
        serializer = UserSerializer(user, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid(raise_exception=True):
            if request.data.get('email') != None and request.data.get('email') != user.email:
                existing = User.objects.filter(email=request.data.get('email')).first()
                if existing:
                    raise serializers.ValidationError('Someone with this email was already registered')
                user.email_confirmed = False
                logout(request)
            serializer.save()
        return Response(serializer.data)