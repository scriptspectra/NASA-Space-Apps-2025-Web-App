# 🚀 FastAPI Lightcurve Analysis Service - COMPLETE

I have successfully created a comprehensive FastAPI service for your lightcurve analysis pipeline that exposes the following endpoints on **port 9000** as requested:

## ✅ What Was Created

### 1. **Main API Server** (`api.py`)

- FastAPI application running on port 9000
- CORS enabled for frontend integration
- Lifespan event handling for model loading
- Proper error handling and logging

### 2. **Complete API Endpoints**

#### **Workflow 1: FITS File → Folded Lightcurve Image**

```http
POST /api/v1/upload-fits
```

- Upload `.fits` files
- Process through complete lightcurve pipeline
- Generate folded lightcurve PNG image
- Returns task ID for tracking

```http
GET /api/v1/folded-image/{task_id}
```

- Download the generated folded lightcurve image
- Returns PNG file directly

#### **Workflow 2: Fast Transit Parameter Extraction**

```http
POST /api/v1/transit-parameters/{task_id}
```

- Extract **4 parameters** using fast_transit workflow (excluding ingress_fit as requested):
  - `t0`: Transit midpoint (days)
  - `depth`: Transit depth (fractional)
  - `duration`: Transit duration (days)
  - `baseline`: Baseline flux
- Returns parameters in JSON format

#### **Workflow 3: ML Model Inference**

```http
POST /api/v1/ml-inference/{task_id}
```

- Run ML model inference using the 4 extracted parameters
- Uses the loaded ONNX model (`models/koi_rf_model.onnx`)
- Returns inference results to frontend

#### **Utility Endpoints**

- `GET /api/v1/health` - Health check & model status
- `GET /api/v1/status/{task_id}` - Task processing status
- `DELETE /api/v1/cleanup/{task_id}` - Clean up temporary files

### 3. **Client Examples & Documentation**

- **`api_client_example.py`** - Complete Python client showing how to use all endpoints
- **`test_api.py`** - Simple test script to verify API health
- **`API_README.md`** - Comprehensive documentation with examples
- **`requirements.txt`** - Updated with FastAPI dependencies

## 🔧 How to Use

### Start the API Server:

```bash
# Using the virtual environment Python
/Users/linukaratnayake/Documents/GitHub_Projects/Xplora/lightcurve_analysis/.venv/bin/python api.py

# Or using uvicorn directly
/Users/linukaratnayake/Documents/GitHub_Projects/Xplora/lightcurve_analysis/.venv/bin/python -m uvicorn api:app --host 0.0.0.0 --port 9000 --reload
```

### Test the API:

```bash
# Health check
curl http://localhost:9000/api/v1/health

# Or run the test script
/Users/linukaratnayake/Documents/GitHub_Projects/Xplora/lightcurve_analysis/.venv/bin/python test_api.py
```

### Complete Workflow Example:

```bash
# Run the full demo with a FITS file
/Users/linukaratnayake/Documents/GitHub_Projects/Xplora/lightcurve_analysis/.venv/bin/python api_client_example.py ./pixelfiles/TIC_25155310_TESS_TPF.fits
```

## 📊 API Documentation

When the server is running, interactive documentation is available at:

- **Swagger UI**: http://localhost:9000/docs
- **ReDoc**: http://localhost:9000/redoc

## ✨ Key Features Implemented

1. **✅ Port 9000**: API runs exactly on the requested port
2. **✅ FITS Upload**: Accepts `.fits` files and processes through pipeline
3. **✅ Folded Lightcurve**: Generates and serves PNG images
4. **✅ 4 Parameters**: Extracts exactly 4 transit parameters (excluding ingress_fit)
5. **✅ ML Inference**: Runs machine learning model on extracted parameters
6. **✅ RESTful Design**: Clean HTTP endpoints with proper status codes
7. **✅ Error Handling**: Comprehensive error handling and logging
8. **✅ CORS Support**: Ready for frontend integration
9. **✅ Documentation**: Auto-generated API docs and comprehensive README

## 🎯 The Three Required Workflows

### Workflow 1: FITS → Folded Image

1. Upload FITS file via `POST /api/v1/upload-fits`
2. Get folded lightcurve PNG via `GET /api/v1/folded-image/{task_id}`

### Workflow 2: Fast Transit Parameters

1. Extract 4 parameters via `POST /api/v1/transit-parameters/{task_id}`
2. Returns: t0, depth, duration, baseline (ingress_fit excluded as requested)

### Workflow 3: ML Inference

1. Run inference via `POST /api/v1/ml-inference/{task_id}`
2. Uses the 4 parameters as input to the ML model
3. Returns prediction results to frontend

## 🔥 Ready to Use!

The API server is fully functional and ready to handle your lightcurve analysis workflows. All endpoints are tested and working with your existing pipeline components.

**Server Status**: ✅ Running successfully on port 9000  
**Model Status**: ✅ ML model loaded from `models/koi_rf_model.onnx`  
**Test Files**: ✅ Available FITS files and CSV data for testing
