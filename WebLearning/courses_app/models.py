# from django.contrib.auth.models import User
from account_app.models import CustomUser as User
from django.db import models


class Language(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name = 'Язык программирования'
        verbose_name_plural = 'Языки программирования'

    def __str__(self):
        return self.name


class Course(models.Model):
    title = models.CharField(max_length=100)
    language = models.ForeignKey(Language, on_delete=models.SET_NULL, related_name='courses',
                                 default=None, blank=True, null=True)
    description = models.TextField()
    tutor = models.CharField(max_length=100)
    pupils = models.ManyToManyField(User, related_name='courses', blank=True)

    def __str__(self):
        return f'"{self.title}"'


class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons', default=None, blank=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    data = models.DateTimeField()

    def __str__(self):
        return f'lesson "{self.title}" from {self.course}'
