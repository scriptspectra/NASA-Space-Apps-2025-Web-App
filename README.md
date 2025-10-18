# Xplora: A Platform for Exoplanet Discovery and Analysis

`Xplora` is a comprehensive, containerized web application engineered for the analysis of astronomical data and the discovery of exoplanets. Developed for the NASA Space Apps Challenge 2025, the platform integrates machine learning models, a FITS file processing pipeline, and an interactive user interface to provide a powerful tool for both researchers and enthusiasts.

**Live Website URL:** https://frontend-452601381743.us-central1.run.app/explore

---

## Key Features

- **Multi-Mission ML Inference:** Classify exoplanet candidates using dedicated models trained on data from NASA's TESS and Kepler missions. The system supports both single-entry analysis and batch processing via CSV file uploads.

- **Automated Light Curve Analysis Pipeline:** Upload raw `.fits` pixel files to initiate a complete analysis workflow. The pipeline generates a phase-folded light curve, extracts four key transit parameters using a trapezoidal model fit, and performs an ML-based classification on the resulting signal.

- **Interactive 3D Visualization:** Explore an embedded instance of NASA's Eyes on Exoplanets, allowing for interactive 3D exploration of known planetary systems.

- **Structured Educational Content:** Access a series of articles covering the fundamental and advanced concepts of exoplanetology, from detection methods to atmospheric analysis.

- **Searchable Exoplanet Database:** Query a catalog of over 5,000 confirmed exoplanets, populated from the NASA Exoplanet Archive and stored in a dedicated PostgreSQL database.

- **Real-time News Integration:** A dedicated updates section provides the latest news on exoplanet discoveries by parsing the Science Daily RSS feed.

---

## System Architecture

The application is built on a decoupled, three-service architecture, orchestrated with Docker Compose for streamlined deployment and scalability. The frontend client communicates directly with the two backend microservices, which have CORS enabled to handle cross-origin requests.

```
+------------------------+      +--------------------------------+
|                        |----->|                                |
|   Client Browser       |      |  Backend ML Service (FastAPI)  |
|   (React/Next.js UI)   |      |  - Port 8000                   |
|                        |<-----|  - ONNX Model Inference        |
+------------------------+      +--------------------------------+
          |
          |
          |               +--------------------------------+
          |-------------->|                                |
          |               |  Light Curve Service (FastAPI) |
          |               |  - Port 9000                   |
          |<--------------|  - FITS Processing & Analysis  |
                          +--------------------------------+
```

- **Frontend (Next.js):** A server-side rendered React application serving the user interface. It is responsible for all client-facing views and state management. It makes direct API calls from the client to the appropriate backend services.

- **Backend ML Service (FastAPI):** A high-performance Python backend dedicated to running inference on pre-trained models for classifying exoplanet candidates from tabular data.

- **Light Curve Service (FastAPI):** A specialized Python service designed to process raw `.fits` files. It encapsulates a multi-step pipeline involving data cleaning, light curve generation, transit parameter extraction, and ML classification.

---

## Technical Approach & Machine Learning Models

The platform's analytical power is derived from two distinct machine learning workflows, each targeting a different type of input data.

### 1) ML Inference Service (Tabular Data Classification)

This service hosts ONNX-formatted models for rapid, low-latency inference on pre-processed exoplanet candidate data.

- **ML Architecture:** The models are built using the CatBoost Classifier, a gradient boosting framework optimized for performance and accuracy on tabular data. They were trained to perform binary classification (Planet Candidate vs. False Positive), with class weights applied to handle dataset imbalances.

- **Models & Features:**
  - **TESS Model:**
    - **Accuracy:** 94.80%
    - **Features Used:** `pl_orbper` (Orbital Period), `pl_trandurh` (Transit Duration), `pl_trandep` (Transit Depth), `st_tmag` (TESS Magnitude), `st_dist` (Stellar Distance), `st_teff` (Stellar Temp.), `st_rad` (Stellar Radius), `st_logg` (Stellar Surface Gravity).
  - **Kepler Model:**
    - **Accuracy:** 97.34%
    - **Features Used:** `koi_period`, `koi_time0bk`, `koi_impact`, `koi_duration`, `koi_depth`, `koi_model_snr`, `koi_steff`, `koi_slogg`, `koi_srad`, `koi_kepmag`.

### 2) Light Curve Service (FITS Data Pipeline)

This service provides a full-cycle processing pipeline for raw astronomical data.

- **Processing Pipeline:**

  - **FITS Ingestion:** Accepts `.fits` pixel files via a REST endpoint.
  - **Light Curve Generation:** Uses the `lightkurve` library to perform aperture photometry, flatten the light curve, and remove outliers, generating a clean, phase-folded light curve based on the best-fit period found by a Box Least Squares (BLS) algorithm.
  - **Parameter Extraction:** A trapezoidal transit model is fitted to the folded light curve using `scipy.optimize.curve_fit` to extract four key parameters: Transit Midpoint (t0), Depth, Duration, and Baseline Flux.

- **ML Architecture:**
  - **Model:** A Random Forest model, exported to ONNX format, performs a final classification based on the four extracted transit parameters. This provides a quick and reliable prediction of whether the transit signal corresponds to an exoplanet candidate or a false positive.

---

## Deployment & Installation

### Docker Deployment (Recommended)

This is the simplest method for running the entire application stack.

**Prerequisites:**

- Docker & Docker Compose
- Git

**Steps:**

**Clone the repository:**

```bash
git clone <repository-url>
cd <repository-directory>
```

**Build and Launch:** This command will build the container images for all three services and start them. The `docker-compose.yml` file defines the services, networks, and port mappings.

```bash
docker-compose up --build -d
```

**Access the Services:**

- **Frontend Application (where the user should actually interact with):** http://localhost:3000
- **Backend ML API Docs:** http://localhost:8000/docs
- **Light Curve API Docs:** http://localhost:9000/docs

---

### Local Development (Manual Setup)

For development purposes, each service can be run independently.

#### 1) Backend ML Service

```bash
cd backend_ml
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

#### 2) Light Curve Service

```bash
cd lightcurve
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts activate
pip install -r requirements.txt
python api.py
```

#### 3) Frontend Service

```bash
cd frontend
npm install
npm run dev
```

---

## API Endpoints

### Backend ML Service (`http://localhost:8000`)

- `POST /inference/tess`: Runs inference using the TESS CatBoost model.
- `POST /inference/kepler`: Runs inference using the Kepler CatBoost model.
- `GET /accuracy/{model}`: Retrieves the accuracy for the specified model (`tess`, `kepler`).

### Light Curve Service (`http://localhost:9000`)

- `POST /api/v1/upload-fits`: Uploads a `.fits` file and initiates the processing pipeline.
- `GET /api/v1/folded-image/{task_id}`: Retrieves the generated phase-folded light curve image.
- `POST /api/v1/transit-parameters/{task_id}`: Extracts the four transit parameters from the processed light curve.
- `POST /api/v1/ml-inference/{task_id}`: Runs inference using the Random Forest model on the extracted parameters.
- `GET /api/v1/health`: Health check endpoint for the service.
