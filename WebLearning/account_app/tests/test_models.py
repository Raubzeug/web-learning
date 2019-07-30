from django.test import TestCase
from ..models import CustomUser
from django.core import mail

class TestCustomUserModer(TestCase):

    def setUp(self):
        self.test_user = CustomUser.objects.create(
            username='test',
            password='test',
            email='test@test.ru'
        )

    def test_user_email_confirmed(self):
        user = CustomUser.objects.get(pk=1)
        email_confirmed = user._meta.get_field('email_confirmed').verbose_name
        self.assertEqual(email_confirmed, 'email confirmed')

    def test_user_verification_uuid(self):
        user = CustomUser.objects.get(pk=1)
        verification_uuid = user._meta.get_field('verification_uuid').verbose_name
        self.assertEqual(verification_uuid, 'Unique Verification UUID')

    def test_user_str(self):
        user = CustomUser.objects.get(pk=1)
        self.assertEqual(str(user), 'test')

    def test_user_postsave(self):
        verification_link = f' http://localhost:8000/api/auth/verify/{self.test_user.verification_uuid}/'
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].subject, 'Verify your account')
        self.assertTrue(verification_link in mail.outbox[0].body)