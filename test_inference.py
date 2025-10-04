from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
import onnxruntime as ort
import numpy as np

app = FastAPI(title="Exoplanet ONNX Inference API")

# ✅ Allow frontend (Next.js) to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load model once on startup
model_path = "models/TESS_Model.onnx"
try:
    model_session = ort.InferenceSession(model_path)
except Exception as e:
    raise RuntimeError(f"Failed to load ONNX model: {e}")

class InferenceRequest(BaseModel):
    inputs: Dict[str, Any]

def run_inference(inputs: Dict[str, Any]) -> Dict[str, Any]:
    try:
        input_feed = {
            name: np.array(data, dtype=np.float32)
            for name, data in inputs.items()
        }

        outputs = model_session.run(None, input_feed)
        output_names = [o.name for o in model_session.get_outputs()]

        result = {}
        for i, output in enumerate(outputs):
            name = output_names[i] if i < len(output_names) else f"output_{i}"
            if hasattr(output, "tolist"):
                result[name] = output.tolist()
            else:
                result[name] = output

        return {"status": "success", "outputs": result}

    except Exception as e:
        return {"status": "error", "error": str(e)}

@app.post("/inference")
async def inference(request: InferenceRequest):
    result = run_inference(request.inputs)
    if result["status"] == "error":
        raise HTTPException(status_code=400, detail=result["error"])
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)