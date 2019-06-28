# from django.contrib.auth.models import User
from account_app.models import CustomUser as User

from .models import Lesson, Course
from rest_framework import serializers


class LessonSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="courses_app:lesson-detail")
    course = serializers.HyperlinkedRelatedField(view_name="courses_app:course-detail",
                                                 queryset=Course.objects.all())

    class Meta:
        model = Lesson
        fields = ('url', 'id', 'title', 'description', 'course', 'data')


class BasicCourseSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="courses_app:course-detail")

    lessons = serializers.HyperlinkedRelatedField(view_name="courses_app:lesson-detail",
                                                 queryset=Lesson.objects.all().select_related('course'), many=True)

    language = serializers.StringRelatedField()

    class Meta:
        model = Course
        fields = ('url', 'id', 'title', 'description', 'language', 'tutor', 'lessons')


class FullCourseSerializer(BasicCourseSerializer):
    pupils = serializers.HyperlinkedRelatedField(view_name="courses_app:customuser-detail",
                                                 queryset=User.objects.all(), many=True)

    class Meta:
        model = Course
        fields = ('url', 'id', 'title', 'description', 'language', 'tutor', 'lessons', 'pupils')
