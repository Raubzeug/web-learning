import pytest

from ..models import CustomUser

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