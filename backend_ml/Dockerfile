FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code and models
COPY main.py .
COPY models/ ./models/

EXPOSE 8080
CMD ["sh","-c","python -m uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}"]
