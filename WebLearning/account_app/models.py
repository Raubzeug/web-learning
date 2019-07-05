import uuid

from django.contrib.auth.models import AbstractUser
from django.core.mail import send_mail
from django.db import models
from django.db.models import signals
from django.urls import reverse


class CustomUser(AbstractUser):
    email_confirmed = models.BooleanField(default=False)
    verification_uuid = models.UUIDField('Unique Verification UUID', default=uuid.uuid4)

    def __str__(self):
        return self.username


def user_post_save(sender, instance, signal, *args, **kwargs):
    if not instance.email_confirmed:
        # Send verification email
        message = """Follow this link to verify your account: http://localhost:8000{0}"""\
            .format(reverse('verify', kwargs={'uuid': str(instance.verification_uuid)}))
        send_mail(
            'Verify your account',
            message,
            'killedandsaved@mail.ru',
            [instance.email],
            fail_silently=False,
        )

signals.post_save.connect(user_post_save, sender=CustomUser)