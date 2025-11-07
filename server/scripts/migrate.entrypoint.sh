#!/bin/sh

if [ "$POSTGRES_ENGINE" = "postgresql" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

# Apply Django migrations
echo "Applying database migrations..."
python manage.py makemigrations
python manage.py flush --noinput
python manage.py migrate --noinput

# Start the Django server
echo "Starting server..."
exec "$@"