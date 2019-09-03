from smtplib import SMTPException

from django_rq import job
from django.core.mail import send_mail


@job('default', timeout=4)
def send_mail_conf(sender, reciever, subj, message, html_message=None):
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