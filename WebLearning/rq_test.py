from redis import Redis
from rq import Queue
from rq.decorators import job

queue = Queue(connection=Redis())

@job('default', connection=Redis())
def send_mail():
    message = 'OK'
    send_mail(
        'Verify your account',
        message,
        'killedandsaved@mail.ru',
        ['killedandsaved@mail.ru'],
        fail_silently=False,
    )
    return True