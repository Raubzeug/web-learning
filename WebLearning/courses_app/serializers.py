from .models import Lesson, Course
from rest_framework import serializers


class LessonSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="courses_app:lesson-detail")
    course = serializers.HyperlinkedIdentityField(view_name="courses_app:course-detail")

    class Meta:
        model = Lesson
        fields = ('url', 'id', 'title', 'description', 'course', 'data')


class CourseSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="courses_app:course-detail")
    lessons = serializers.HyperlinkedIdentityField(view_name="courses_app:lesson-detail", many=True)
    pupils = serializers.HyperlinkedIdentityField(view_name="courses_app:user-detail", many=True)

    class Meta:
        model = Course
        fields = ('url', 'id', 'title', 'description', 'tutor', 'lessons', 'pupils')