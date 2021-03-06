from django.core.mail import send_mail
from redis import ConnectionError as RedisConnectionError
from rest_framework.generics import get_object_or_404

from .tasks import send_mail_reminder
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from .models import Lesson, Course
from .serializers import LessonSerializer, BasicCourseSerializer, FullCourseSerializer


class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all().select_related('course')
    serializer_class = LessonSerializer

    def create(self, request, *args, **kwargs):
        permission_class = IsAdminUser
        has_permissions = permission_class.has_permission(self, request, view=LessonViewSet)
        if has_permissions:
            return viewsets.ModelViewSet.create(self, request=request, *args, **kwargs) #Somewhy super(). doesn't work......
        raise PermissionDenied('You doesnt have permissions to add lessons')

    def update(self, request, *args, **kwargs):
        permission_class = IsAdminUser
        has_permissions = permission_class.has_permission(self, request, view=LessonViewSet)
        if has_permissions:
            return viewsets.ModelViewSet.update(self, request=request, *args, **kwargs)
        raise PermissionDenied('You doesnt have permissions to change lesson data')

    def destroy(self, request, *args, **kwargs):
        permission_class = IsAdminUser
        has_permissions = permission_class.has_permission(self, request, view=LessonViewSet)
        if has_permissions:
            return viewsets.ModelViewSet.destroy(self, request=request, *args, **kwargs)
        raise PermissionDenied('You doesnt have permissions to delete lesson')


class CourseViewSet(viewsets.ModelViewSet):

    queryset = Course.objects.all().prefetch_related('pupils', 'lessons').select_related('language')

    def get_serializer_class(self):
        if self.request.user.is_superuser:
            return FullCourseSerializer
        return BasicCourseSerializer

    def create(self, request, *args, **kwargs):
        permission_class = IsAdminUser
        has_permissions = permission_class.has_permission(self, request, view=CourseViewSet)
        if has_permissions:
            return viewsets.ModelViewSet.create(self, request=request, *args, **kwargs) #Somewhy super(). doesn't work......
        raise PermissionDenied('You doesnt have permissions to add courses')

    def update(self, request, *args, **kwargs):
        permission_class = IsAdminUser
        has_permissions = permission_class.has_permission(self, request, view=LessonViewSet)
        if has_permissions:
            return viewsets.ModelViewSet.update(self, request=request, *args, **kwargs)
        raise PermissionDenied('You doesnt have permissions to change course data')

    def destroy(self, request, *args, **kwargs):
        permission_class = IsAdminUser
        has_permissions = permission_class.has_permission(self, request, view=LessonViewSet)
        if has_permissions:
            return viewsets.ModelViewSet.destroy(self, request=request, *args, **kwargs)
        raise PermissionDenied('You doesnt have permissions to delete course')

    @action(detail=True, methods=['get'], permission_classes=(IsAuthenticated, ))
    def enroll(self, request, pk=None):
        user = request.user
        course = get_object_or_404(Course, pk=pk)
        if course is not None and user.is_active:
            course.pupils.add(user)
            sender = 'killedandsaved@mail.ru'
            reciever = user.email
            subj = 'Enrolling course'
            message = f'You have succeslully enrolled the course {course.title}'
            try:
                send_mail_reminder.delay(sender, reciever, subj, message)
            except RedisConnectionError:
                send_mail(subj, message, sender, [reciever], fail_silently=True)
            return Response(f'You\'ve succesfully enrolled the course {course}', status=status.HTTP_200_OK)
        return Response('No action applied', status=status.HTTP_400_BAD_REQUEST)