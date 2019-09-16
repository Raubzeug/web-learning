import pytest

from ..models import CustomUser
from django.core import mail

@pytest.mark.django_db
def test_user_email_confirmed(table_with_user):
    user = CustomUser.objects.get(pk=1)
    email_confirmed = user._meta.get_field('email_confirmed').verbose_name
    assert email_confirmed == 'email confirmed'

@pytest.mark.django_db
def test_user_verification_uuid(table_with_user):
    user = CustomUser.objects.get(pk=1)
    verification_uuid = user._meta.get_field('verification_uuid').verbose_name
    assert verification_uuid == 'Unique Verification UUID'

@pytest.mark.django_db
def test_user_str(table_with_user):
    user = CustomUser.objects.get(pk=1)
    assert str(user) == 'test'

@pytest.mark.django_db
def test_user_postsave():
    CustomUser.objects.create(
        username='test2',
        password='test',
        email='test2@test.ru',
    )
    user = CustomUser.objects.get(pk=1)
    verification_link = f' http://localhost:8000/api/auth/verify/{user.verification_uuid}/'
    assert len(mail.outbox) == 1
    assert mail.outbox[0].subject == 'Verify your account'
    assert verification_link in mail.outbox[0].body