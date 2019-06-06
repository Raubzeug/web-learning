from account_app.views import UserViewSet, GroupViewSet
from . import views
from django.urls import path, include, re_path
from rest_framework import routers

app_name = 'courses_app'

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('groups', GroupViewSet)
router.register('lessons', views.LessonViewSet)
router.register('courses', views.CourseViewSet)


urlpatterns = [
    path('', include(router.urls)),

]
