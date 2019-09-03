from smtplib import SMTPException
from datetime import datetime, timezone, timedelta

from django.core.mail import send_mail
from django_rq import job

from redis import Redis
from rq_scheduler import Scheduler

from courses_app.models import (
    Lesson,
)

@job('default', timeout=4)
def send_mail_reminder(sender, reciever, subj, message, html_message=None):
    if not isinstance(reciever, list):
        reciever = [reciever]
    try:
        send_mail(
            subj,
            message,
            sender,
            reciever,
            fail_silently=False,
            html_message=html_message,
        )
        return True
    except SMTPException as e:
        return False, e


def check_today_lessons():
    now = datetime.now(timezone.utc) + timedelta(days=1)
    queryset = Lesson.objects.filter(data__lte=now)
    for lesson in queryset:
        pupils = lesson.course.pupils.only('email')
        mailing_list = [p.email for p in pupils]
        subj = 'Lesson starts soon!'
        message = f'In 60 minutes starts lesson {lesson.title}'
        scheduler = Scheduler(connection=Redis())
        scheduler.enqueue_at(lesson.data - timedelta(hours=1), send_mail_reminder, sender='killedandsaved@mail.ru',
                             reciever=mailing_list, subj=subj, message=message)
