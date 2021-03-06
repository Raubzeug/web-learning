import json
import pytest

from rest_framework.test import APIRequestFactory, APIClient
from rest_framework import status
from django.core import mail

from ..models import CustomUser
from ..serializers import UserSerializer, RegistrationSerializer, LoginSerializer, LogoutSerializer

factory = APIRequestFactory()


@pytest.mark.django_db
def test_view_url_exists_at_desired_location(admin_login):
    resp = admin_login.get('/api/users/')
    assert resp.status_code == 200

@pytest.mark.django_db
def test_get_all_users_admin(admin_login):
    response = admin_login.get('/api/users/')
    request = factory.get('/')
    users = CustomUser.objects.all().order_by('-date_joined')
    serializer = UserSerializer(users, many=True, context={'request':request})
    assert response.data == serializer.data
    assert response.status_code == status.HTTP_200_OK
#
@pytest.mark.django_db
def test_user_not_permitted(table_with_user):
    response = table_with_user.get('/api/users/')
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

@pytest.mark.django_db
def test_view_url_exists_at_desired_location_registration(table_with_user):
    resp = table_with_user.options('/api/auth/registration/')
    assert resp.status_code == 200

@pytest.mark.django_db
def test_registration_send_mail():
    api_client = APIClient()
    data = {
        'username': 'test1',
        'password': '111111',
        'confirm_password': '111111',
        'email': 't1@example.com'
    }
    response = api_client.post('/api/auth/registration/', json.dumps(data), content_type='application/json')
    try:
        user = CustomUser.objects.get(username=data['username'])
    except CustomUser.DoesNotExist:
        user = None
    verification_link = ''
    if user is not None:
        verification_link = f'/api/auth/verify/{user.verification_uuid}/'
    assert user is not None
    assert len(mail.outbox) == 1
    assert mail.outbox[0].subject == 'Verify your account'
    assert mail.outbox[0].to[0] == user.email
    assert verification_link in mail.outbox[0].body

@pytest.mark.django_db
def test_verification():
    api_client=APIClient()
    data = {
        'username': 'test1',
        'password': '111111',
        'confirm_password': '111111',
        'email': 't1@example.com'
    }
    response = api_client.post('/api/auth/registration/', json.dumps(data), content_type='application/json')
    try:
        user = CustomUser.objects.get(username=data['username'])
    except CustomUser.DoesNotExist:
        user = None
    assert user is not None
    assert not user.email_confirmed
    verification_link = mail.outbox[0].body.split()[-1]
    response = api_client.get(verification_link, follow=True)
    assert response.status_code == 200
    user = CustomUser.objects.get(pk=1)
    assert user.email_confirmed

@pytest.mark.django_db
def test_registration_valid_data(table_with_user):
    data = {
            'username': 'test1',
            'password': '111111',
            'confirm_password': '111111',
            'email': 't1@example.com'
        }
    response=table_with_user.post('/api/auth/registration/', json.dumps(data), content_type='application/json')
    try:
        user = CustomUser.objects.get(username=data['username'])
    except CustomUser.DoesNotExist:
        user = None
    assert response.status_code == status.HTTP_201_CREATED
    assert response.data['username'] == data['username']
    assert response.data['email'] == data['email']
    assert user != None

@pytest.mark.django_db
def test_registration_invalid_data_passwords_doesnt_match(table_with_user):
    pass_not_match = {
                    'username': 'test1',
                    'password': '111111',
                    'confirm_password': '111112',
                    'email': 't1@example.com'
                }
    response = table_with_user.post('/api/auth/registration/', json.dumps(pass_not_match),
                                content_type='application/json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST

@pytest.mark.django_db
def test_registration_invalid_data_no_username(table_with_user):
    no_username = {
                    'username': '',
                    'password': '111111',
                    'confirm_password': '111111',
                    'email': 't1@example.com'
                }
    response = table_with_user.post('/api/auth/registration/', json.dumps(no_username),
                                content_type='application/json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST

@pytest.mark.django_db
def test_registration_invalid_data_no_password(table_with_user):
    no_password = {
                    'username': 'test1',
                    'password': '',
                    'confirm_password': '',
                    'email': 't1@example.com'
                }
    response = table_with_user.post('/api/auth/registration/', json.dumps(no_password),
                                content_type='application/json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST

@pytest.mark.django_db
def test_registration_invalid_data_no_email(table_with_user):
    no_email = {
                    'username': 'test1',
                    'password': '111111',
                    'confirm_password': '111111',
                    'email': ''
                }
    response = table_with_user.post('/api/auth/registration/', json.dumps(no_email),
                                content_type='application/json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST

@pytest.mark.django_db
def test_registration_invalid_data_long_username(table_with_user):
    long_username = {
                    'username': 't'*21,
                    'password': '111111',
                    'confirm_password': '111111',
                    'email': 't1@example.com'
                }
    response = table_with_user.post('/api/auth/registration/', json.dumps(long_username),
                                content_type='application/json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST

@pytest.mark.django_db
def test_registration_invalid_data_long_password(table_with_user):
    long_pass = {
                    'username': 'test1',
                    'password': '1'*21,
                    'confirm_password': '1'*21,
                    'email': 't1@example.com'
                }
    response = table_with_user.post('/api/auth/registration/', json.dumps(long_pass),
                                content_type='application/json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST

@pytest.mark.django_db
def test_registration_invalid_data_short_password(table_with_user):
    short_pass = {
                    'username': 'test1',
                    'password': '1'*4,
                    'confirm_password': '1'*4,
                    'email': 't1@example.com'
                }
    response = table_with_user.post('/api/auth/registration/', json.dumps(short_pass),
                                content_type='application/json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST

@pytest.mark.django_db
def test_registration_invalid_data_long_mail(table_with_user):
    long_mail = {
                    'username': 'test1',
                    'password': '111111',
                    'confirm_password': '111111',
                    'email': 't1'*10+'@example.com'
                }
    response = table_with_user.post('/api/auth/registration/', json.dumps(long_mail),
                                content_type='application/json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST

@pytest.mark.django_db
def test_registration_invalid_data_existing_email(table_with_user):
    email_exists = {
                    'username': 'test1',
                    'password': '111111',
                    'confirm_password': '111111',
                    'email': 'test@test.ru'
                }
    response = table_with_user.post('/api/auth/registration/', json.dumps(email_exists),
                                content_type='application/json')
    assert response.status_code == status.HTTP_400_BAD_REQUEST

@pytest.mark.django_db
def test_view_url_exists_at_desired_location_login(table_with_user):
    resp = table_with_user.options('/api/auth/login/')
    assert resp.status_code == 200

@pytest.mark.django_db
def test_login_valid(table_with_user):
    resp = table_with_user.post('/api/auth/login/', json.dumps({'username':'test', 'password':'test'}),
                            content_type='application/json')
    assert resp.status_code == 200

@pytest.mark.django_db
def test_login_email_not_confirmed(table_with_user):
    resp = table_with_user.post('/api/auth/login/', json.dumps({'username': 'test2', 'password': 'test'}),
                            content_type='application/json')
    assert resp.status_code == status.HTTP_400_BAD_REQUEST

@pytest.mark.django_db
def test_login_wrong_credentials(table_with_user):
    resp = table_with_user.post('/api/auth/login/', json.dumps({'username': 'test3', 'password': 'test3'}),
                            content_type='application/json')
    assert resp.status_code == status.HTTP_400_BAD_REQUEST

@pytest.mark.django_db
def test_view_url_exists_at_desired_location_logout(admin_login):
    resp = admin_login.get('/api/auth/logout/')
    assert resp.status_code == 200