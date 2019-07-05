from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group

from account_app.models import (
    CustomUser
)

from faker import Faker
import random

from courses_app.models import Course


class Command(BaseCommand):

    def generate(self, amount=10):
        fake = Faker()
        groups = list(Group.objects.values_list('id',flat=True))
        courses = list(Course.objects.values_list('id', flat=True))
        for i in range(amount):
            user = CustomUser.objects.create(
            username=fake.user_name(),
            email=fake.email(),
            password=fake.password()
            )
            user.courses.add(
                *random.sample(courses, random.randint(0, len(courses)))
            )

            user.groups.add(
                *random.sample(groups, random.randint(0, len(groups)))
            )

    def handle(self, *args, **kwargs):
        self.generate()