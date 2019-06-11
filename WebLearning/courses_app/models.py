from django.contrib.auth.models import User
from django.db import models


class Course(models.Model):
    title = models.CharField(max_length=100)
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
