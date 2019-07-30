from django.test import TestCase
from ..models import Language, Course, Lesson
from account_app.models import CustomUser

class LanguageTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Language.objects.create(name = 'Pascal')

    def test_lang_label(self):
        lang = Language.objects.get(id=1)
        label = lang._meta.get_field('name').verbose_name
        self.assertEqual(label, 'name')

    def test_str(self):
        lang = Language.objects.get(id=1)
        self.assertEqual(str(lang), 'Pascal')

class CourseTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        course = Course.objects.create(
            title = 'Course',
            language = Language.objects.create(name = 'test_lang'),
            description = 'Test_desc',
            tutor = 'Test_tutor'
        )
        lesson = Lesson.objects.create(
                    course = Course.objects.get(pk=1),
                    title='test_lesson',
                    description='Test_desc',
                    data='2019-07-29'
                    )
        course.lessons.add(lesson)

    def test_course_label(self):
        course = Course.objects.get(id=1)
        label = course._meta.get_field('title').verbose_name
        self.assertEqual(label, 'title')

    def test_course_lang(self):
        course = Course.objects.get(id=1)
        language = course._meta.get_field('language').verbose_name
        self.assertEqual(language, 'language')

    def test_course_desc(self):
        course = Course.objects.get(id=1)
        description = course._meta.get_field('description').verbose_name
        self.assertEqual(description, 'description')

    def test_course_lessons(self):
        course = Course.objects.get(id=1)
        lessons = course._meta.get_field('lessons').related_name
        self.assertEqual(lessons, 'lessons')

    def test_course_tutor(self):
        course = Course.objects.get(id=1)
        language = course._meta.get_field('tutor').verbose_name
        self.assertEqual(language, 'tutor')

    def test_str(self):
        course = Course.objects.get(id=1)
        self.assertEqual(str(course), '"Course"')


class LessonTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        Lesson.objects.create(
            course = Course.objects.create(
                title = 'Course',
                description = 'Test_desc',
                tutor = 'Test_tutor'
                ),
            title='test_lesson',
            description='Test_desc',
            data='2019-07-29'
        )

    def test_lesson_label(self):
        lesson = Lesson.objects.get(id=1)
        label = lesson._meta.get_field('title').verbose_name
        self.assertEqual(label, 'title')

    def test_lesson_desc(self):
        lesson = Lesson.objects.get(id=1)
        description = lesson._meta.get_field('description').verbose_name
        self.assertEqual(description, 'description')

    def test_lesson_data(self):
        lesson = Lesson.objects.get(id=1)
        data = lesson._meta.get_field('data').verbose_name
        self.assertEqual(data, 'data')

    def test_lesson_course(self):
        lesson = Lesson.objects.get(id=1)
        course = lesson._meta.get_field('course').verbose_name
        self.assertEqual(course, 'course')