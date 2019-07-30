import json

from django.test import TestCase
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory, APIClient
from rest_framework import status
from django.core import mail

from ..models import CustomUser
from ..serializers import UserSerializer, RegistrationSerializer, LoginSerializer, LogoutSerializer

factory = APIRequestFactory()

class verifyEmailTest(TestCase):

    def setUp(self):
        self.user = CustomUser.objects.create(
            username='test1',
            password='test',
            email='test@t.t'
        )
        self.client = APIClient()

    def test_verification(self):
        user = CustomUser.objects.get(pk=1)
        self.assertFalse(user.email_confirmed)
        verification_link = mail.outbox[0].body.split()[-1]
        response = self.client.get(verification_link)
        self.assertRedirects(response, '/api/auth/verification_successfull')
        user = CustomUser.objects.get(pk=1)
        self.assertTrue(user.email_confirmed)

class getAllUsersTest(TestCase):

    def setUp(self):
        num = 5
        for i in range(num):
            CustomUser.objects.create(
                username=f'test{i}',
                password=f'test{i}',
                email=f'test{i}'
            )
        self.admin = CustomUser.objects.create_superuser(
            username='admin',
            password='admin',
            email='a@a.a',
        )
        self.client = APIClient()

    def test_view_url_exists_at_desired_location(self):
        self.client.force_authenticate(self.admin)
        resp = self.client.get('/api/users/')
        self.assertEqual(resp.status_code, 200)

    def test_get_all_users_admin(self):
        self.client.force_authenticate(self.admin)
        response = self.client.get('/api/users/')
        request = factory.get('/')
        users = CustomUser.objects.all().order_by('-date_joined')
        serializer = UserSerializer(users, many=True, context={'request':request})
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_not_permitted(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class registrationTest(TestCase):

    @classmethod
    def setUpTestData(cls):

        CustomUser.objects.create(
            username='test',
            password='test',
            email='t@example.com'
        )

        cls.valid = {
            'username': 'test1',
            'password': '111111',
            'confirm_password': '111111',
            'email': 't1@example.com'
        }

        cls.pass_not_match = {
            'username': 'test1',
            'password': '111111',
            'confirm_password': '111112',
            'email': 't1@example.com'
        }

        cls.email_exists = {
            'username': 'test1',
            'password': '111111',
            'confirm_password': '111111',
            'email': 't@example.com'
        }

        cls.client = APIClient()

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.options('/api/auth/registration/')
        self.assertEqual(resp.status_code, 200)

    def test_registration_valid_data(self):
        response=self.client.post('/api/auth/registration/', json.dumps(self.valid), content_type='application/json')
        try:
            user = CustomUser.objects.get(username=self.valid['username'])
        except CustomUser.DoesNotExist:
            user = None
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['username'], self.valid['username'])
        self.assertEqual(response.data['email'], self.valid['email'])
        self.assertNotEqual(user, None)

    def test_registration_invalid_data_passwords_doesnt_match(self):
        response = self.client.post('/api/auth/registration/', json.dumps(self.pass_not_match),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_registration_invalid_data_existing_email(self):
        response = self.client.post('/api/auth/registration/', json.dumps(self.email_exists),
                                    content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class loginTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.client = APIClient()
        cls.user1 = CustomUser.objects.create(
            username='test',
            email='t@test.com',
            email_confirmed=True
        )
        cls.user1.set_password('test')
        cls.user1.save()

        cls.user2 = CustomUser.objects.create(
            username='test2',
            email='t2@test.com',
        )
        cls.user2.set_password('test')
        cls.user2.save()

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.options('/api/auth/login/')
        self.assertEqual(resp.status_code, 200)

    def test_login_valid(self):
        resp = self.client.post('/api/auth/login/', json.dumps({'username':'test', 'password':'test'}),
                                content_type='application/json')
        self.assertEqual(resp.status_code, 200)

    def test_login_email_not_confirmed(self):
        resp = self.client.post('/api/auth/login/', json.dumps({'username': 'test2', 'password': 'test'}),
                                content_type='application/json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_wrong_credentials(self):
        resp = self.client.post('/api/auth/login/', json.dumps({'username': 'test3', 'password': 'test3'}),
                                content_type='application/json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)


class logoutTest(TestCase):

    def setUp(self):
        self.client = APIClient()

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/auth/logout/')
        self.assertEqual(resp.status_code, 200)