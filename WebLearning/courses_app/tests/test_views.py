import json
import pytest

from rest_framework.request import Request
from rest_framework.test import APIRequestFactory, APIClient
from rest_framework import status

from account_app.models import CustomUser
from ..models import Lesson, Language, Course
from ..serializers import BasicCourseSerializer, FullCourseSerializer

factory = APIRequestFactory()

valid = {
    'title': 'Course_valid',
    'description': 'Test_desc',
    'tutor': 'Test_tutor',
    'lessons': [],
    'pupils': []
}

invalid = {
    'title': '',
    'language': [],
    'description': 'Test_desc',
    'tutor': 'Test_tutor',
    'lessons': [],
    'pupils': []
}

@pytest.mark.django_db
def test_view_url_exists_at_desired_location(table_with_data):
    resp = table_with_data.get('/api/courses/')
    assert resp.status_code == 200

@pytest.mark.django_db
def test_get_all_courses_admin(admin_login):
    response = admin_login.get('/api/courses/')
    request = factory.get('/')
    courses = Course.objects.all()
    serializer = FullCourseSerializer(courses, many=True, context={'request': Request(request)})
    assert response.data == serializer.data
    assert response.status_code == status.HTTP_200_OK

@pytest.mark.django_db
def test_get_all_courses_user(table_with_data):
    response = table_with_data.get('/api/courses/')
    request = factory.get('/')
    courses = Course.objects.all()
    serializer = BasicCourseSerializer(courses, many=True, context={'request': Request(request)})
    assert response.data == serializer.data
    assert response.status_code == status.HTTP_200_OK

@pytest.mark.django_db
def test_create_valid_course_admin(admin_login):
    response = admin_login.post(
        '/api/courses/',
        data=json.dumps(valid),
        content_type='application/json'
    )
    assert response.status_code == status.HTTP_201_CREATED

@pytest.mark.django_db
def test_create_invalid_course_admin(admin_login):
    response = admin_login.post(
        '/api/courses/',
        data=json.dumps(invalid),
        content_type='application/json'
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST

@pytest.mark.django_db
def test_create_valid_course_user():
    client = APIClient()
    response = client.post(
        '/api/courses/',
        data=json.dumps(valid),
        content_type='application/json'
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN

@pytest.mark.django_db
def test_update_valid_course_admin(admin_login):
    response = admin_login.put(
        '/api/courses/1/',
        data = json.dumps(valid),
        content_type = 'application/json'
    )
    assert response.status_code == status.HTTP_200_OK

@pytest.mark.django_db
def test_update_invalid_course_admin(admin_login):
    response = admin_login.put(
        '/api/courses/1/',
        data = json.dumps(invalid),
        content_type = 'application/json'
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST

@pytest.mark.django_db
def test_update_valid_course_user(table_with_data):
    client = APIClient()
    response = client.put(
        '/api/courses/1/',
        data = json.dumps(valid),
        content_type = 'application/json'
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN

@pytest.mark.django_db
def test_update_invalid_course_user(table_with_data):
    client = APIClient()
    response = client.put(
        '/api/courses/1/',
        data = json.dumps(invalid),
        content_type = 'application/json'
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN

@pytest.mark.django_db
def test_delete_valid_course_admin(admin_login):
    response = admin_login.delete(
        '/api/courses/1/',
    )
    assert response.status_code == status.HTTP_204_NO_CONTENT

@pytest.mark.django_db
def test_delete_valid_course_user(table_with_data):
    response = table_with_data.delete(
        '/api/courses/1/',
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN

@pytest.mark.django_db
def test_enroll_course_authenticated(table_with_data):
    pupil = CustomUser.objects.create(
        username='test_enroll',
        password='testtest',
        email='test_enroll@test.ru'
    )
    table_with_data.force_login(pupil)
    response = table_with_data.get(
        '/api/courses/1/enroll/',
    )
    pupils = Course.objects.get(pk=1).pupils.all()
    assert response.status_code == status.HTTP_200_OK
    assert pupil in pupils

@pytest.mark.django_db
def test_enroll_course_not_authenticated(table_with_data):
    response = table_with_data.get(
        '/api/courses/1/enroll/',
    )
    assert response.status_code == status.HTTP_401_UNAUTHORIZED

@pytest.mark.django_db
def test_enroll_invalid_course_authenticated(table_with_data):
    pupil = CustomUser.objects.get(pk=1)
    table_with_data.force_login(pupil)
    response = table_with_data.get(
        '/api/courses/2/enroll/',
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND