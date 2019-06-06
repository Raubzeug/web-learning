from rest_framework import viewsets, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAdminUser

from rest_framework_swagger.views import get_swagger_view
from .models import Lesson, Course
from .serializers import LessonSerializer, CourseSerializer


class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

    def create(self, request, *args, **kwargs):
        permission_class = IsAdminUser
        has_permissions = permission_class.has_permission(self, request, view=LessonViewSet)
        if has_permissions == True:
            return viewsets.ModelViewSet.create(self, request=request, *args, **kwargs) #Somewhy super(). doesn't work......
        else:
            raise PermissionDenied('You doesnt have permissions to add lessons')

    def update(self, request, *args, **kwargs):
        permission_class = IsAdminUser
        has_permissions = permission_class.has_permission(self, request, view=LessonViewSet)
        if has_permissions == True:
            return viewsets.ModelViewSet.update(self, request=request, *args, **kwargs)
        else:
            raise PermissionDenied('You doesnt have permissions to change lesson data')

    def destroy(self, request, *args, **kwargs):
        permission_class = IsAdminUser
        has_permissions = permission_class.has_permission(self, request, view=LessonViewSet)
        if has_permissions == True:
            return viewsets.ModelViewSet.destroy(self, request=request, *args, **kwargs)
        else:
            raise PermissionDenied('You doesnt have permissions to delete lesson')


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def create(self, request, *args, **kwargs):
        permission_class = IsAdminUser
        has_permissions = permission_class.has_permission(self, request, view=LessonViewSet)
        if has_permissions == True:
            return viewsets.ModelViewSet.create(self, request=request, *args, **kwargs) #Somewhy super(). doesn't work......
        else:
            raise PermissionDenied('You doesnt have permissions to add courses')

    def update(self, request, *args, **kwargs):
        permission_class = IsAdminUser
        has_permissions = permission_class.has_permission(self, request, view=LessonViewSet)
        if has_permissions == True:
            return viewsets.ModelViewSet.update(self, request=request, *args, **kwargs)
        else:
            raise PermissionDenied('You doesnt have permissions to change course data')

    def destroy(self, request, *args, **kwargs):
        permission_class = IsAdminUser
        has_permissions = permission_class.has_permission(self, request, view=LessonViewSet)
        if has_permissions == True:
            return viewsets.ModelViewSet.destroy(self, request=request, *args, **kwargs)
        else:
            raise PermissionDenied('You doesnt have permissions to delete course')