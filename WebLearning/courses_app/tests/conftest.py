import pytest
from ..models import Lesson, Language, Course
from account_app.models import CustomUser
from rest_framework.test import APIClient

@pytest.fixture
def table_with_data():
    Language.objects.create(name='test_lang')
    pupil = CustomUser.objects.create(
                username = 'test',
                email = 'test@test.ru',
                password = '111111'
            )
    instance = Course.objects.create(
        title='Course1',
        language=Language.objects.get(id=1),
        description='Test_desc',
        tutor='Test_tutor'
    )
    lesson = Lesson.objects.create(
        course=Course.objects.get(pk=1),
        title='test_lesson',
        description='Test_desc',
        data='2019-07-29'
    )
    instance.pupils.add(pupil)
    return APIClient()

@pytest.fixture
def admin_login(table_with_data):
    admin = CustomUser.objects.create_superuser(
        username='admin',
        password='admin',
        email='admin@admin.ru'
    )
    table_with_data.force_login(admin)
    return table_with_data

