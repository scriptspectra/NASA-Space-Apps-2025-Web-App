from fastapi import FastAPI, HTTPException, Header, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
import onnxruntime as ort
import onnx
import numpy as np
import os

# Internal auth dependency
INTERNAL_TOKEN = os.getenv("INTERNAL_AUTH_TOKEN")

async def require_internal_token(x_internal_token: str | None = Header(default=None)):
    if INTERNAL_TOKEN and x_internal_token != INTERNAL_TOKEN:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")

app = FastAPI(
    title="Exoplanet ONNX Inference API",
    dependencies=[Depends(require_internal_token)] if INTERNAL_TOKEN else []
)

# Internal auth dependency
INTERNAL_TOKEN = os.getenv("INTERNAL_AUTH_TOKEN")

async def require_internal_token(x_internal_token: str | None = Header(default=None)):
    if INTERNAL_TOKEN and x_internal_token != INTERNAL_TOKEN:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")

# CORS for frontend - env-driven origins
origins = [o.strip() for o in os.getenv("CORS_ORIGINS", "").split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if origins else [
        "http://localhost:3000",
        "http://frontend:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model paths
tess_model_path = "models/TESS_Model_v2.onnx"
k2_model_path = "models/k2_model.onnx"
kepler_model_path = "models/KOI_Model_v2.onnx"

# Lazy-loaded sessions
tess_session = None
k2_session = None
kepler_session = None

def get_tess_session():
    global tess_session
    if tess_session is None:
        tess_session = ort.InferenceSession(tess_model_path)
    return tess_session

def get_k2_session():
    global k2_session
    if k2_session is None:
        k2_session = ort.InferenceSession(k2_model_path)
    return k2_session

def get_kepler_session():
    global kepler_session
    if kepler_session is None:
        kepler_session = ort.InferenceSession(kepler_model_path)
    return kepler_session

class InferenceRequest(BaseModel):
    inputs: Dict[str, Any]

def run_inference(session, inputs: Dict[str, Any]) -> Dict[str, Any]:
    try:
        input_feed = {
            name: np.array(data, dtype=np.float32)
            for name, data in inputs.items()
        }

        outputs = session.run(None, input_feed)
        output_names = [o.name for o in session.get_outputs()]

        result = {}
        for i, output in enumerate(outputs):
            name = output_names[i] if i < len(output_names) else f"output_{i}"
            result[name] = output.tolist() if hasattr(output, "tolist") else output

        return {"status": "success", "outputs": result}

    except Exception as e:
        return {"status": "error", "error": str(e)}

def get_model_accuracy(model_path: str):
    model = onnx.load(model_path)
    metadata_props = {prop.key: prop.value for prop in model.metadata_props}
    accuracy = metadata_props.get("accuracy")  # or "Accuracy" depending on your model
    return float(accuracy) if accuracy is not None else None

# Inference endpoints
@app.post("/inference/tess")
async def tess_inference(request: InferenceRequest):
    session = get_tess_session()
    result = run_inference(session, request.inputs)
    if result["status"] == "error":
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@app.post("/inference/k2")
async def k2_inference(request: InferenceRequest):
    session = get_k2_session()
    result = run_inference(session, request.inputs)
    if result["status"] == "error":
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@app.post("/inference/kepler")
async def kepler_inference(request: InferenceRequest):
    session = get_kepler_session()
    result = run_inference(session, request.inputs)
    if result["status"] == "error":
        raise HTTPException(status_code=400, detail=result["error"])
    return result

# Accuracy endpoints
@app.get("/accuracy/tess")
async def tess_accuracy():
    acc = get_model_accuracy(tess_model_path)
    if acc is None:
        raise HTTPException(status_code=404, detail="Accuracy not found in model metadata")
    return {"accuracy": acc}

@app.get("/accuracy/k2")
async def k2_accuracy():
    acc = get_model_accuracy(k2_model_path)
    if acc is None:
        raise HTTPException(status_code=404, detail="Accuracy not found in model metadata")
    return {"accuracy": acc}

@app.get("/accuracy/kepler")
async def kepler_accuracy():
    acc = get_model_accuracy(kepler_model_path)
    if acc is None:
        raise HTTPException(status_code=404, detail="Accuracy not found in model metadata")
    return {"accuracy": acc}

@app.get("/health")
async def health():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
