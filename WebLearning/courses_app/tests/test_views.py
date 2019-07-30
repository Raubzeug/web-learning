import json

from django.test import TestCase
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory, APIClient
from rest_framework import status

from account_app.models import CustomUser
from ..models import Lesson, Language, Course
from ..serializers import BasicCourseSerializer, FullCourseSerializer

factory = APIRequestFactory()


class GetAllCoursesTest(TestCase):

    @classmethod
    def setUp(self):
        num = 10
        lang = Language.objects.create(name='test_lang')

        pupil = CustomUser.objects.create(
                    username = 'test',
                    email = 'test@test.ru',
                    password = '111111'
                )
        for i in range(num):
            instance = Course.objects.create(
                title=f'Course{i}',
                language=Language.objects.get(id=1),
                description=f'Test_desc{i}',
                tutor='Test_tutor'
            )
            instance.pupils.add(pupil)
        self.client = APIClient()

    def test_view_url_exists_at_desired_location(self):
        resp = self.client.get('/api/courses/')
        self.assertEqual(resp.status_code, 200)

    def test_get_all_courses_admin(self):
        admin = CustomUser.objects.create_superuser(
            username='admin',
            password='admin',
            email='admin@admin.ru'
        )
        self.client.force_login(admin)
        response = self.client.get('/api/courses/')
        request = factory.get('/')
        courses = Course.objects.all()
        serializer = FullCourseSerializer(courses, many=True, context={'request': Request(request)})
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_all_courses_user(self):
        response = self.client.get('/api/courses/')
        request = factory.get('/')
        courses = Course.objects.all()
        serializer = BasicCourseSerializer(courses, many=True, context={'request': Request(request)})
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class CreateCourseTest(TestCase):

    @classmethod
    def setUp(self):
        lang = Language.objects.create(name='test_lang')

        self.valid = {
            'title': 'Course1',
            'description': 'Test_desc',
            'tutor': 'Test_tutor',
            'lessons': [],
            'pupils': []
        }

        self.invalid = {
            'title': '',
            'language': [],
            'description': 'Test_desc',
            'tutor': 'Test_tutor',
            'lessons': [],
            'pupils': []
        }
        self.client = APIClient()

    def test_create_valid_course_admin(self):
        admin = CustomUser.objects.create_superuser(
            username='admin',
            password='admin',
            email='admin@admin.ru'
        )
        self.client.force_login(admin)
        response = self.client.post(
            '/api/courses/',
            data = json.dumps(self.valid),
            content_type = 'application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_course_admin(self):
        admin = CustomUser.objects.create_superuser(
            username='admin',
            password='admin',
            email='admin@admin.ru'
        )
        self.client.force_login(admin)
        response = self.client.post(
            '/api/courses/',
            data = json.dumps(self.invalid),
            content_type = 'application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_valid_course_user(self):
        response = self.client.post(
            '/api/courses/',
            data = json.dumps(self.valid),
            content_type = 'application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_invalid_course_user(self):
        response = self.client.post(
            '/api/courses/',
            data = json.dumps(self.invalid),
            content_type = 'application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class UpdateCourseTest(TestCase):

    def setUp(self):
        lang = Language.objects.create(name='test_lang')

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
        instance.pupils.add(pupil)

        self.valid = {
            'title': 'Course2',
            'description': 'Test_desc2',
            'tutor': 'Test_tutor2',
            'lessons': [],
            'pupils': []
        }

        self.invalid = {
            'title': '',
            'description': 'Test_desc2',
            'tutor': 'Test_tutor2',
            'lessons': [],
            'pupils': []
        }
        self.client = APIClient()

    def test_update_valid_course_admin(self):
        admin = CustomUser.objects.create_superuser(
            username='admin',
            password='admin',
            email='admin@admin.ru'
        )
        self.client.force_login(admin)
        response = self.client.put(
            '/api/courses/1/',
            data = json.dumps(self.valid),
            content_type = 'application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_invalid_course_admin(self):
        admin = CustomUser.objects.create_superuser(
            username='admin',
            password='admin',
            email='admin@admin.ru'
        )
        self.client.force_login(admin)
        response = self.client.put(
            '/api/courses/1/',
            data = json.dumps(self.invalid),
            content_type = 'application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_valid_course_user(self):
        response = self.client.put(
            '/api/courses/1/',
            data = json.dumps(self.valid),
            content_type = 'application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_invalid_course_user(self):
        response = self.client.put(
            '/api/courses/1/',
            data = json.dumps(self.invalid),
            content_type = 'application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class DeleteCourseTest(TestCase):

    def setUp(self):
        self.course = Course.objects.create(
            title='Course1',
            language=None,
            description='Test_desc',
            tutor='Test_tutor'
        )
        self.client = APIClient()

    def test_delete_valid_course_admin(self):
        admin = CustomUser.objects.create_superuser(
            username='admin',
            password='admin',
            email='admin@admin.ru'
        )
        self.client.force_login(admin)
        response = self.client.delete(
            '/api/courses/1/',
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_valid_course_user(self):
        response = self.client.delete(
            '/api/courses/1/',
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

class EnrollCourseTest(TestCase):

    def setUp(self):
        self.course = Course.objects.create(
            title='Course1',
            language=None,
            description='Test_desc',
            tutor='Test_tutor',
        )
        self.client = APIClient()

    def test_enroll_course_authenticated(self):
        pupil = CustomUser.objects.create(
            username='test',
            password='testtest',
            email='test@test.ru'
        )
        self.client.force_login(pupil)
        response = self.client.get(
            '/api/courses/1/enroll/',
        )
        pupils = self.course.pupils.all()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(pupil in pupils)

    def test_enroll_course_not_authenticated(self):
        response = self.client.get(
            '/api/courses/1/enroll/',
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_enroll_invalid_course_authenticated(self):
        pupil = CustomUser.objects.create(
            username='test',
            password='testtest',
            email='test@test.ru'
        )
        self.client.force_login(pupil)
        response = self.client.get(
            '/api/courses/2/enroll/',
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)