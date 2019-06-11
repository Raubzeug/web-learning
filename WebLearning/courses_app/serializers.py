from django.contrib.auth.models import User

from .models import Lesson, Course
from rest_framework import serializers


class LessonSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="courses_app:lesson-detail")
    course = serializers.HyperlinkedRelatedField(view_name="courses_app:course-detail",
                                                 queryset=Course.objects.all())

    class Meta:
        model = Lesson
        fields = ('url', 'id', 'title', 'description', 'course', 'data')


class CourseSerializer(serializers.HyperlinkedModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name="courses_app:course-detail")
    lessons = serializers.HyperlinkedRelatedField(view_name="courses_app:lesson-detail",
                                                 queryset=Lesson.objects.all(), many=True)
    pupils = serializers.HyperlinkedRelatedField(view_name="courses_app:user-detail",
                                                 queryset=User.objects.all(), many=True)

    class Meta:
        model = Course
        fields = ('url', 'id', 'title', 'description', 'tutor', 'lessons', 'pupils')

