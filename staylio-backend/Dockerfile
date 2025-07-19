# Use the official Python image as the base image
FROM python:3.13.3-slim-bullseye

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /staylio-backend

# Install system dependencies
RUN apt-get update && apt-get install -y netcat && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project into the container
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Default command (will be overridden by docker-compose)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]