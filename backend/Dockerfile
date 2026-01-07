# Use official Python base image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    POETRY_VERSION=1.6.1

# Set working directory
WORKDIR /backend

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        tesseract-ocr \
        libtesseract-dev \
        build-essential \
        wget \
        && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir requests rapidfuzz

# Copy the entire project
COPY . .

# Expose port (Render uses 10000+ internally, but Flask default is 5000)
EXPOSE 5000

# Command to run your app
# Replace 'app:app' if your Flask app object has a different name or file
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
