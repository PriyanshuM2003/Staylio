#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Checking if the database is running..."

    while ! nc -z $DB_HOST $DB_PORT; do
        sleep 0.1
    done

    echo "The database is up and running :-D"
fi

python manage.py makemigrations
python manage.py migrate

exec "$@"
