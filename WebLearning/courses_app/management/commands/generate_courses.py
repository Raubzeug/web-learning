from django.core.management.base import BaseCommand

from account_app.models import CustomUser
from courses_app.models import (
    Course,
    Lesson,
    Language
)

from faker import Faker
import random

class Command(BaseCommand):

    def generate(self, amount=20):
        fake = Faker()
        languages = Language.objects.all()
        pupils = list(CustomUser.objects.values_list('id', flat=True))

        for i in range(amount):
            course = Course.objects.create(
                title=fake.domain_word(),
                language=random.choice(languages),
                description=fake.text(),
                tutor=fake.name()
            )
            course.pupils.add(
                *random.sample(pupils, random.randint(0, len(pupils)))

            )

    def handle(self, *args, **kwargs):
        self.generate()