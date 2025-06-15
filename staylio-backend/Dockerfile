# Use the official Python image as the base image
FROM python:3.13.3-slim-bullseye

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /staylio-backend

RUN apt-get update && apt-get install -y netcat

# Install dependencies
RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip install -r requirements.txt


COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /staylio-backend/entrypoint.sh
RUN chmod +x /staylio-backend/entrypoint.sh

# Copy the entire project into the container
COPY . .

ENTRYPOINT ["/staylio-backend/entrypoint.sh"]

# Expose the port the app runs on
EXPOSE 8000

# Run the Django development server
CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py collectstatic --noinput --clear && gunicorn --bind 0.0.0.0:${PORT:-8000} --workers 3 backend.wsgi:application"]
