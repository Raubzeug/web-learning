from datetime import datetime

from django.core.management.base import BaseCommand
from redis import Redis, ConnectionError
from rq_scheduler import Scheduler

from courses_app.tasks import check_today_lessons

class Command(BaseCommand):

    def generate(self):
        scheduler = Scheduler(connection=Redis())
        try:
            scheduler.schedule(datetime.utcnow(), func=check_today_lessons, interval=60 * 60 * 24)
        except ConnectionError:
            print('Redis server is not available')

    def handle(self, *args, **kwargs):
        self.generate()