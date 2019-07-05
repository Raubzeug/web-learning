from django.core.management.base import BaseCommand

from courses_app.models import (
    Course,
    Lesson,
    Language
)

languages = ['Python', 'CSS', 'HTML', 'JavaScript', 'C++', 'SQL']
import random

class Command(BaseCommand):

    def generate(self):
        for i in range(len(languages)):
            Language.objects.create(
            name=random.choice(languages),
            )

    def handle(self, *args, **kwargs):
        self.generate()