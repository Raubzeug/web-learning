import random
import uuid
from redis import ConnectionError as RedisConnectionError

from django.contrib.auth.models import AbstractUser
from django.core.mail import send_mail
from django.db import models
from django.urls import reverse

from .tasks import send_mail_conf

from django.template import Template, Context

class CustomUser(AbstractUser):
    email_confirmed = models.BooleanField(default=False)
    verification_uuid = models.UUIDField('Unique Verification UUID', default=uuid.uuid4)

    def __str__(self):
        return self.username

    def user_post_save(self):
        if self.is_superuser:
            return
        if not self.email_confirmed:
            sender = 'killedandsaved@mail.ru'
            reciever = self.email
            subj = 'Verify your account'
            random_digit = random.randint(1, 1000000)
            message = """Follow this link to verify your account: http://localhost:8000{0}""" \
                .format(reverse('verify', kwargs={'uuid': str(self.verification_uuid), 'random_digit': random_digit}))

            html_message = Template("""
            <!DOCTYPE html>
            <html>
                <head>
                </head>
                <body>
                    <p>Follow this link to verify your account: 
                        <a href='http://localhost:8000{{ ver_link }}{{ random_digit }}'>verification link</a>
                    </p>
                </body>
            </html>
            """)
            c = Context({'ver_link': reverse('verify', kwargs={'uuid': str(self.verification_uuid),
                                                               'random_digit': random_digit})})
            try:
                send_mail_conf.delay(sender, reciever, subj, message, html_message=html_message.render(c))
            except RedisConnectionError:
                send_mail(subj, message, sender, [reciever], fail_silently=True, html_message=html_message.render(c))

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.user_post_save()

