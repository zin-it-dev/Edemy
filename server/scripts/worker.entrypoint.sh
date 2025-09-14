#!/bin/sh

while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do sleep 1; done

while ! nc -z $REDIS_HOST $REDIS_PORT; do sleep 1; done

# Run a worker
echo "🚀 Starting Celery Worker..."
celery -A core worker -l INFO --concurrency 1 -E