import pytest
from ..models import Language, Course, Lesson

@pytest.mark.django_db
def test_lang_label(table_with_data):
    lang = Language.objects.get(id=1)
    label = lang._meta.get_field('name').verbose_name
    assert label == 'name'

@pytest.mark.django_db
def test_lang_str(table_with_data):
    lang = Language.objects.get(id=1)
    assert str(lang) == 'test_lang'

@pytest.mark.django_db
def test_course_label(table_with_data):
    course = Course.objects.get(id=1)
    label = course._meta.get_field('title').verbose_name
    assert label == 'title'

@pytest.mark.django_db
def test_course_lang(table_with_data):
    course = Course.objects.get(id=1)
    language = course._meta.get_field('language').verbose_name
    assert language == 'language'

@pytest.mark.django_db
def test_course_desc(table_with_data):
    course = Course.objects.get(id=1)
    description = course._meta.get_field('description').verbose_name
    assert description == 'description'

@pytest.mark.django_db
def test_course_lessons(table_with_data):
    course = Course.objects.get(id=1)
    lessons = course._meta.get_field('lessons').related_name
    assert lessons == 'lessons'

@pytest.mark.django_db
def test_course_tutor(table_with_data):
    course = Course.objects.get(id=1)
    language = course._meta.get_field('tutor').verbose_name
    assert language == 'tutor'

@pytest.mark.django_db
def test_course_str(table_with_data):
    course = Course.objects.get(id=1)
    assert str(course) == '"Course1"'

@pytest.mark.django_db
def test_lesson_label(table_with_data):
    lesson = Lesson.objects.get(id=1)
    label = lesson._meta.get_field('title').verbose_name
    assert label == 'title'

@pytest.mark.django_db
def test_lesson_desc(table_with_data):
    lesson = Lesson.objects.get(id=1)
    description = lesson._meta.get_field('description').verbose_name
    assert description == 'description'

@pytest.mark.django_db
def test_lesson_data(table_with_data):
    lesson = Lesson.objects.get(id=1)
    data = lesson._meta.get_field('data').verbose_name
    assert data == 'data'

@pytest.mark.django_db
def test_lesson_course(table_with_data):
    lesson = Lesson.objects.get(id=1)
    course = lesson._meta.get_field('course').verbose_name
    assert course == 'course'