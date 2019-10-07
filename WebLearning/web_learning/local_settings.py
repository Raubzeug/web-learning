import os
import socket
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

if socket.gethostname() == 'your.domain.com':
    DEBUG = False
else:
    DEBUG = True
SECRET_KEY = 'o8b6_*o$hn3360^$7s(2u^_pw0=ax5v%y#@e9$ap6&qrmc744d'

sentry_sdk.init(
    dsn="https://33bd064748ca4bbc839a6a89b4334824@sentry.io/1765860",
    integrations=[DjangoIntegration()]
)

if DEBUG:
    ALLOWED_HOSTS = ['localhost', '127.0.0.1']
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }

RQ_QUEUES = {
    'default': {
        'HOST': 'localhost',
        'PORT': 6379,
        'DB': 0,
    }
}