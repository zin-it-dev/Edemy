#!/bin/sh
set -e

while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do sleep 1; done

# Apply Django migrations
echo "Applying database migrations..."
python manage.py migrate django_celery_beat --noinput

# Run a beat
echo "⏰ Starting Celery Beat..."
celery -A core beat -l INFO --scheduler django_celery_beat.schedulers:DatabaseScheduler