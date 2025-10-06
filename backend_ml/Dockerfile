FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code and models
COPY main.py .
COPY models/ ./models/

# Expose port (optional)
EXPOSE 8080

# Run FastAPI using main.py
CMD ["python", "main.py"]
