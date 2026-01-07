# Use a lightweight Python 3.11 image
FROM python:3.11-slim

# Install system dependencies, including Tesseract OCR
RUN apt-get update && \
    apt-get install -y tesseract-ocr libtesseract-dev libleptonica-dev pkg-config \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory inside container
WORKDIR /app

# Copy Python dependencies first for caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code
COPY . .

# Expose port (Render default for web services is 10000)
EXPOSE 10000

# Gunicorn command to run your app
CMD ["gunicorn", "your_app.wsgi:application", "--bind", "0.0.0.0:10000"]
