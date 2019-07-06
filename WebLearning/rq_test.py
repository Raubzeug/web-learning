from django.core.mail import send_mail
from redis import Redis
from rq import Queue
from rq.decorators import job
from rq_scheduler import Scheduler
from datetime import datetime, timedelta

redis_con = Redis()
queue = Queue(connection=redis_con)

@job('default', connection=redis_con)
def send_mail_conf(sender, reciever, subj, message):
    send_mail(
        subj,
        message,
        sender,
        [reciever],
        fail_silently=False,
    )
    return True

scheduler = Scheduler(connection=redis_con)