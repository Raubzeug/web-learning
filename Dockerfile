FROM python:3.6-alpine

WORKDIR /project

COPY dev-requirements.txt .

COPY requirements.txt .

RUN pip install -r dev-requirements.txt

RUN pip install -r requirements.txt

COPY . .