from django_rq import job
from django.core.mail import send_mail

@job
def send_mail_conf(sender, reciever, subj, message):
    send_mail(
        subj,
        message,
        sender,
        [reciever],
        fail_silently=False,
    )
    return True