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

