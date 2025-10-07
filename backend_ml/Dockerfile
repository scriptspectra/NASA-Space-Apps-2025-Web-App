FROM python:3.11-slim

WORKDIR /app

# Install system dependencies including curl for health checks
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code and models
COPY main.py .
COPY models/ ./models/

EXPOSE 8080
CMD ["sh","-c","python -m uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}"]
