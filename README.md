# NASA Space Apps 2025 - Exoplanet Detection Web Application

A full-stack web application for exoplanet detection using machine learning models from NASA's Kepler, TESS, and K2 missions.

## Project Structure

```
NASA-Space-Apps-2025-Web-App/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # Next.js 13+ app directory
│   ├── components/          # Reusable React components
│   ├── lib/                # Utility libraries
│   ├── public/             # Static assets
│   ├── Dockerfile.frontend # Frontend Docker configuration
│   └── README.md           # Frontend documentation
├── backend_ml/              # FastAPI backend for ML inference
│   ├── models/             # ONNX model files
│   ├── main.py             # Main FastAPI application
│   ├── test_inference.py   # Testing utilities
│   ├── check_accuracy.py   # Model accuracy utilities
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile          # Backend Docker configuration
│   └── README.md           # Backend documentation
├── lightcurve/             # Separate lightcurve analysis module
└── docker-compose.yml      # Docker orchestration
```

## Quick Start

### Using Docker (Recommended)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd NASA-Space-Apps-2025-Web-App
   ```

2. **Start the application**

   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Local Development

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

#### Backend

```bash
cd backend_ml
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## Features

- **Multi-Mission Support**: TESS, Kepler, and K2 mission data
- **ML-Powered Classification**: ONNX models for exoplanet detection
- **Interactive UI**: Modern Next.js frontend with real-time inference
- **Batch Processing**: CSV upload for bulk predictions
- **Educational Content**: Learn about exoplanet detection methods
- **Responsive Design**: Works on desktop and mobile devices

## Machine Learning Models

The application uses ONNX models trained on data from:

- **TESS**: Transiting Exoplanet Survey Satellite
- **Kepler**: Original Kepler Space Telescope
- **K2**: Extended Kepler mission

Each model is optimized for detecting exoplanets in light curve data from their respective missions.

## API Endpoints

- `POST /inference/tess` - TESS model predictions
- `POST /inference/kepler` - Kepler model predictions
- `POST /inference/k2` - K2 model predictions
- `GET /accuracy/{model}` - Get model accuracy metrics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- NASA for providing the mission data
- Space Apps Challenge organizers
- The exoplanet research community
