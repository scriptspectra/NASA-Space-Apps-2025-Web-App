# Backend ML - Exoplanet Classification API

This directory contains the FastAPI backend server for exoplanet classification using ONNX models.

## Files

- `main.py` - Main FastAPI application with inference endpoints
- `test_inference.py` - Test script for inference functionality
- `check_accuracy.py` - Utility to check model accuracy metadata
- `requirements.txt` - Python dependencies
- `Dockerfile` - Docker configuration for backend
- `models/` - Directory containing ONNX model files
  - `TESS_Model_v2.onnx` - TESS mission model
  - `KOI_Model_v2.onnx` - Kepler mission model
  - `k2_model.onnx` - K2 mission model

## API Endpoints

### Inference Endpoints

- `POST /inference/tess` - TESS model inference
- `POST /inference/kepler` - Kepler model inference
- `POST /inference/k2` - K2 model inference

### Accuracy Endpoints

- `GET /accuracy/tess` - Get TESS model accuracy
- `GET /accuracy/kepler` - Get Kepler model accuracy
- `GET /accuracy/k2` - Get K2 model accuracy

## Running Locally

### With Python Virtual Environment

````bash
# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
```bash
uvicorn main:app --host 0.0.0.0 --port 8080 --reload
````

````

### With Docker

```bash
# Build and run with docker-compose (from root directory)
docker-compose up backend

# Or build directly
docker build -t exoplanet-backend .
```bash
docker run -p 8080:8080 exoplanet-backend
````

````

## API Usage

The API expects input features in the following format:

```json
{
  "inputs": {
    "features": [[value1, value2, value3, ...]]
  }
}
````

Response format:

```json
{
  "status": "success",
  "outputs": {
    "label": [0 or 1],
    "probabilities": [{"0": prob_false, "1": prob_true}]
  }
}
```

Where:

- `label[0] = 1` indicates a confirmed exoplanet
- `label[0] = 0` indicates a false positive
- Probabilities show confidence scores for each class
