from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from .models import Lesson, Course
from .serializers import LessonSerializer, CourseSerializer


class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
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
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

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
        course = Course.objects.get(pk=pk)
        if course is not None and user.is_active:
            course.pupils.add(user)
            return Response(f'You\'ve succesfully enrolled the course {course}', status=status.HTTP_200_OK)
        return Response('No action applied', status=status.HTTP_200_OK)