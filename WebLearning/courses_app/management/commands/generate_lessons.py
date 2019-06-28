from django.core.management.base import BaseCommand

from courses_app.models import (
    Course,
    Lesson,
    Language
)

from faker import Faker
import random

class Command(BaseCommand):

    def generate(self, amount=100):
        fake = Faker()
        courses = Course.objects.values_list('id',flat=True)
        for i in range(amount):
            lesson = Lesson.objects.create(
            course_id=random.choice(courses),
            title=fake.domain_word(),
            description=fake.text(),
            data=fake.future_datetime()
            )

    def handle(self, *args, **kwargs):
        self.generate()