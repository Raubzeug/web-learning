from datetime import datetime, timezone, timedelta

from django.core.management.base import BaseCommand
from redis import Redis, ConnectionError
from rq_scheduler import Scheduler

from courses_app.tasks import send_mail_conf

from courses_app.models import (
    Lesson,
)

def check_today_lessons():
    now = datetime.now(timezone.utc) + timedelta(days=1)
    queryset = Lesson.objects.filter(data__lte=now)
    for lesson in queryset:
        pupils = lesson.course.pupils.only('email')
        mailing_list = [p.email for p in pupils]
        subj = 'Lesson starts soon!'
        message = f'In 60 minutes starts lesson {lesson.title}'
        scheduler = Scheduler(connection=Redis())
        scheduler.enqueue_at(lesson.data - timedelta(hours=1), send_mail_conf, sender='killedandsaved@mail.ru',
                             reciever=mailing_list, subj=subj, message=message)

class Command(BaseCommand):

    def generate(self):
        scheduler = Scheduler(connection=Redis())
        try:
            scheduler.schedule(datetime.utcnow(), func=check_today_lessons, interval=60 * 60 * 24)
        except ConnectionError:
            print('Redis server is not available')

    def handle(self, *args, **kwargs):
        self.generate()