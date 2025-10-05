# Light Curve Analyzer Integration

This document describes the integration of the Light Curve Analyzer functionality into the NASA Space Apps 2025 Web Application.

## Overview

The Light Curve Analyzer allows users to upload FITS pixel files, generate light curves, extract transit parameters, and run machine learning inference to predict exoplanet candidates.

## Architecture

The application now consists of three main services:

1. **Frontend** (Next.js) - Port 3000
2. **Backend ML** (FastAPI) - Port 8000  
3. **Light Curve API** (FastAPI) - Port 9000

## Features

### Light Curve Analyzer Page (`/lightcurve-analyzer`)

1. **FITS File Upload**: Drag & drop or click to upload .fits files (max 100MB)
2. **Real-time Progress Tracking**: Visual progress indicators for each processing step
3. **Light Curve Visualization**: Displays the generated phase-folded light curve image
4. **Transit Parameter Extraction**: Shows extracted parameters (t0, depth, duration, baseline)
5. **ML Prediction**: Uses machine learning to predict exoplanet probability with confidence scores

### Workflow

1. **Upload FITS File** → Process through lightcurve pipeline → Generate folded lightcurve image
2. **Extract Transit Parameters** → Fit trapezoidal model → Extract 4 key parameters
3. **ML Inference** → Run machine learning model → Predict exoplanet vs false positive

## API Endpoints

### Light Curve API (Port 9000)

- `POST /api/v1/upload-fits` - Upload and process FITS file
- `GET /api/v1/folded-image/{task_id}` - Download folded lightcurve image
- `POST /api/v1/transit-parameters/{task_id}` - Extract transit parameters
- `POST /api/v1/ml-inference/{task_id}` - Run ML inference
- `GET /api/v1/health` - Health check

### Frontend API Routes (Proxy)

- `POST /api/lightcurve/upload-fits` - Proxy to lightcurve API
- `GET /api/lightcurve/folded-image/{task_id}` - Proxy to lightcurve API
- `POST /api/lightcurve/transit-parameters/{task_id}` - Proxy to lightcurve API
- `POST /api/lightcurve/ml-inference/{task_id}` - Proxy to lightcurve API

## Components

### New Components Created

1. **`FitsUpload.tsx`** - File upload component with drag & drop support
2. **`TransitParametersDisplay.tsx`** - Display transit parameters in cards
3. **`LightCurveMLResults.tsx`** - Show ML prediction results with confidence bars
4. **`Alert.tsx`** - UI component for error/success messages

### Updated Components

1. **`Sidebar.tsx`** - Added "Light Curve Analyzer" menu item
2. **Updated routing** - New page at `/lightcurve-analyzer`

## Docker Configuration

### Services

```yaml
services:
  backend:        # Port 8000 - Existing ML backend
  lightcurve:     # Port 9000 - New lightcurve analysis
  frontend:       # Port 3000 - Updated with lightcurve integration
```

### Environment Variables

- `LIGHTCURVE_API_URL` - URL for lightcurve service (default: http://lightcurve:9000)
- `BACKEND_URL` - URL for main backend service
- `NEXT_PUBLIC_API_URL` - Public API URL for frontend

## Usage

### Docker (Recommended)

```bash
# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs lightcurve
```

### Development

```bash
# Light Curve API
cd lightcurve
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python api.py

# Frontend
cd frontend
npm run dev

# Backend ML
cd backend_ml
# Follow existing setup instructions
```

## Testing

### Sample Files

Use the provided sample FITS file: `lightcurve/pixelfiles/TIC_25155310_TESS_TPF.fits`

### API Testing

```bash
# Health check
curl http://localhost:9000/api/v1/health

# Upload test file
curl -X POST -F "file=@lightcurve/pixelfiles/TIC_25155310_TESS_TPF.fits" http://localhost:9000/api/v1/upload-fits
```

### Complete Workflow Test

1. Open http://localhost:3000/lightcurve-analyzer
2. Upload a FITS file
3. Wait for processing to complete
4. View results: light curve image, transit parameters, and ML prediction

## Models

The lightcurve service uses:
- **`koi_rf_model.onnx`** - Random Forest model for exoplanet classification
- Input: 4 transit parameters (t0, depth, duration, baseline)
- Output: Binary classification with probabilities

## Dependencies

### Python (Light Curve API)
- lightkurve>=2.5.1 - Light curve analysis
- astropy>=7.1.0 - Astronomy data handling
- onnxruntime>=1.15.1 - ML model inference
- fastapi>=0.104.1 - Web framework
- scipy, matplotlib, pandas - Scientific computing

### Frontend
- React components for file upload and result display
- Next.js API routes for proxying requests
- Tailwind CSS for styling

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000, 8000, 9000 are available
2. **Memory issues**: FITS file processing can be memory intensive
3. **Model loading**: Ensure `koi_rf_model.onnx` exists in `lightcurve/models/`

### Logs

```bash
# Check lightcurve API logs
docker-compose logs lightcurve

# Check all services
docker-compose logs
```

## Future Enhancements

1. **Batch Processing**: Support multiple FITS files
2. **Advanced Visualization**: Interactive plots
3. **Parameter Tuning**: Configurable analysis parameters
4. **Results Export**: CSV/JSON export of results
5. **Model Selection**: Multiple ML models to choose from