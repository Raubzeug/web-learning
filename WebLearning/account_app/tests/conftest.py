import pytest
import json
from rest_framework.test import APIClient

from ..models import CustomUser

@pytest.fixture
def table_with_user():
    test_user = CustomUser.objects.create(
        username='test',
        password='test',
        email='test@test.ru',
        email_confirmed = True
    )
    test_user.set_password('test')
    test_user.save()
    test_user2 = CustomUser.objects.create(
        username='test2',
        password='test',
        email='test2@test.ru',
    )
    test_user2.set_password('test')
    test_user2.save()
    return APIClient()

@pytest.fixture
def admin_login(table_with_user):
    admin = CustomUser.objects.create_superuser(
        username='admin',
        password='admin',
        email='admin@admin.ru'
    )
    table_with_user.force_login(admin)
    return table_with_user

