from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
import onnxruntime as ort
import onnx
import numpy as np

app = FastAPI(title="Exoplanet ONNX Inference API")

from fastapi.middleware.cors import CORSMiddleware

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://frontend:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load all three models
tess_model_path = "models/TESS_Model_v2.onnx"
k2_model_path = "models/k2_model.onnx"
kepler_model_path = "models/KOI_Model_v2.onnx"

try:
    tess_session = ort.InferenceSession(tess_model_path)
except Exception as e:
    raise RuntimeError(f"Failed to load TESS model: {e}")

try:
    k2_session = ort.InferenceSession(k2_model_path)
except Exception as e:
    raise RuntimeError(f"Failed to load K2 model: {e}")

try:
    kepler_session = ort.InferenceSession(kepler_model_path)
except Exception as e:
    raise RuntimeError(f"Failed to load Kepler model: {e}")

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
    result = run_inference(tess_session, request.inputs)
    if result["status"] == "error":
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@app.post("/inference/k2")
async def k2_inference(request: InferenceRequest):
    result = run_inference(k2_session, request.inputs)
    if result["status"] == "error":
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@app.post("/inference/kepler")
async def kepler_inference(request: InferenceRequest):
    result = run_inference(kepler_session, request.inputs)
    if result["status"] == "error":
        raise HTTPException(status_code=400, detail=result["error"])
    return result

# ✅ Accuracy endpoints
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
