# Lightcurve Analysis API

A FastAPI-based REST API for processing astronomical lightcurve data through a complete analysis pipeline including transit detection, parameter extraction, and machine learning inference.

## Features

- **FITS File Processing**: Upload `.fits` files and process them through the lightcurve analysis pipeline
- **Folded Lightcurve Generation**: Generate phase-folded lightcurve images
- **Transit Parameter Extraction**: Extract transit parameters using trapezoidal fitting
- **ML Inference**: Run machine learning models on extracted parameters
- **RESTful API**: Clean REST endpoints with proper HTTP status codes
- **CORS Support**: Cross-origin resource sharing for frontend integration

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Start the API Server

```bash
python api.py
```

The API will be available at `http://localhost:9000`

### 3. Test the API

```bash
# Check API health
curl http://localhost:9000/api/v1/health

# Or use the example client
python api_client_example.py ./pixelfiles/your_file.fits
```

## API Endpoints

### Core Workflow Endpoints

#### 1. Upload FITS File

```http
POST /api/v1/upload-fits
Content-Type: multipart/form-data
```

Upload a `.fits` file and process it through the lightcurve pipeline.

**Parameters:**

- `file`: FITS file (multipart/form-data)

**Response:**

```json
{
  "task_id": "uuid-string",
  "status": "completed",
  "message": "FITS file processed successfully",
  "best_period": 1.234567
}
```

#### 2. Get Folded Lightcurve Image

```http
GET /api/v1/folded-image/{task_id}
```

Download the generated folded lightcurve image as PNG.

**Response:** PNG image file

#### 3. Extract Transit Parameters

```http
POST /api/v1/transit-parameters/{task_id}
```

Extract 4 transit parameters using the fast_transit workflow (excludes ingress_fit parameter).

**Response:**

```json
{
  "task_id": "uuid-string",
  "status": "success",
  "parameters": {
    "t0": 1234.56789, // Transit midpoint (days)
    "depth": 0.001234, // Transit depth (fractional)
    "duration": 0.123456, // Transit duration (days)
    "baseline": 1.000123 // Baseline flux
  },
  "message": "Transit parameters extracted successfully"
}
```

#### 4. Run ML Inference

```http
POST /api/v1/ml-inference/{task_id}
```

Run machine learning inference using the extracted transit parameters.

**Response:**

```json
{
  "task_id": "uuid-string",
  "status": "success",
  "input_parameters": {
    "t0": 1234.56789,
    "depth": 0.001234,
    "duration": 0.123456,
    "baseline": 1.000123
  },
  "inference_results": {
    "prediction": [0.85, 0.15] // Model output
    // Additional model outputs...
  },
  "message": "ML inference completed successfully"
}
```

### Utility Endpoints

#### Check Task Status

```http
GET /api/v1/status/{task_id}
```

#### Health Check

```http
GET /api/v1/health
```

#### Cleanup Task

```http
DELETE /api/v1/cleanup/{task_id}
```

## Workflow

The complete analysis workflow consists of three main steps:

1. **Pipeline Processing**: Upload FITS → Process through lightcurve pipeline → Generate folded lightcurve image
2. **Parameter Extraction**: Extract 4 transit parameters using trapezoidal fitting
3. **ML Inference**: Run machine learning model on the extracted parameters

## Example Usage

### Python Client Example

```python
import requests

# 1. Upload FITS file
with open('your_file.fits', 'rb') as f:
    files = {'file': ('your_file.fits', f, 'application/octet-stream')}
    response = requests.post('http://localhost:9000/api/v1/upload-fits', files=files)
    task_id = response.json()['task_id']

# 2. Get folded image
response = requests.get(f'http://localhost:9000/api/v1/folded-image/{task_id}')
with open('folded_lightcurve.png', 'wb') as f:
    f.write(response.content)

# 3. Extract transit parameters
response = requests.post(f'http://localhost:9000/api/v1/transit-parameters/{task_id}')
parameters = response.json()['parameters']

# 4. Run ML inference
response = requests.post(f'http://localhost:9000/api/v1/ml-inference/{task_id}')
inference_results = response.json()['inference_results']

# 5. Cleanup
requests.delete(f'http://localhost:9000/api/v1/cleanup/{task_id}')
```

### cURL Examples

```bash
# Upload FITS file
curl -X POST -F "file=@your_file.fits" http://localhost:9000/api/v1/upload-fits

# Get transit parameters
curl -X POST http://localhost:9000/api/v1/transit-parameters/{task_id}

# Run ML inference
curl -X POST http://localhost:9000/api/v1/ml-inference/{task_id}
```

## Configuration

### Port Configuration

The API runs on port 9000 by default. To change the port, modify the `uvicorn.run()` call in `api.py`:

```python
uvicorn.run("api:app", host="0.0.0.0", port=9000)  # Change port here
```

### Model Path

The ML model is loaded from `models/koi_rf_model.onnx`. Ensure this file exists or update the path in the startup event.

### Temporary Storage

Temporary files are stored in `./api_temp/`. This directory is created automatically.

## Error Handling

The API returns appropriate HTTP status codes:

- `200 OK`: Request successful
- `400 Bad Request`: Invalid request (e.g., wrong file format)
- `404 Not Found`: Resource not found (e.g., invalid task_id)
- `500 Internal Server Error`: Server error during processing
- `503 Service Unavailable`: ML model not loaded

## Production Considerations

For production deployment:

1. **Database**: Replace file-based task storage with a proper database
2. **File Storage**: Use cloud storage for temporary files
3. **Authentication**: Add API key or OAuth authentication
4. **Rate Limiting**: Implement rate limiting for uploads
5. **CORS**: Configure CORS origins properly
6. **Logging**: Enhanced logging and monitoring
7. **Load Balancing**: Use multiple workers for high throughput

## Dependencies

See `requirements.txt` for the complete list of dependencies. Key packages include:

- `fastapi`: Web framework
- `uvicorn`: ASGI server
- `lightkurve`: Astronomical lightcurve analysis
- `onnxruntime`: ML model inference
- `numpy`, `scipy`, `matplotlib`, `pandas`: Scientific computing

## API Documentation

When the server is running, interactive API documentation is available at:

- Swagger UI: `http://localhost:9000/docs`
- ReDoc: `http://localhost:9000/redoc`
