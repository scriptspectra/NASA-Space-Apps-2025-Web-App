# Use Python 3.11 slim
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for caching
COPY requirements.txt .

# Upgrade pip and install Python dependencies
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Copy model file into the image (no volume mount needed for Render)
COPY models/koi_rf_model.onnx ./models/koi_rf_model.onnx

# Create necessary directories
RUN mkdir -p /app/api_temp /app/models /app/plots

# Set environment variables
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

EXPOSE 9000

# Run the application with uvicorn and dynamic PORT
CMD ["sh","-c","uvicorn api:app --host 0.0.0.0 --port ${PORT:-9000}"]
