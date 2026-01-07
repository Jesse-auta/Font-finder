# Use a slim Python 3.11 base image
FROM python:3.11-slim

# Install system dependencies for Tesseract OCR
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    tesseract-ocr \
    libtesseract-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Set working directory inside the container
WORKDIR /app

# Copy requirements first for caching
COPY requirements.txt .

# Upgrade pip and install Python dependencies
RUN pip install --upgrade pip

# Force a compatible rapidfuzz version (avoid yanked versions)
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your app code
COPY . .

# Optional: expose port (Render uses 10000 by default for web services)
EXPOSE 10000

# Command to run your Flask app with Gunicorn
# Replace 'app:app' with your actual WSGI entry point
CMD ["gunicorn", "app:app", "--bind", "0.0.0.0:10000", "--workers", "1"]
