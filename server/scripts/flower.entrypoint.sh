#!/bin/sh
set -e

while ! nc -z $REDIS_HOST $REDIS_PORT; do sleep 1; done

# Run a flower
echo "🌸 Starting Celery Flower..."
celery -A core flower --port=5555