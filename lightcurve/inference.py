import onnxruntime as ort
import numpy as np
from typing import Any, Dict

def load_model(model_path: str) -> ort.InferenceSession:
    """Load an ONNX model from the specified path."""
    return ort.InferenceSession(model_path)

def run_inference(session: ort.InferenceSession, input_data: Dict[str, np.ndarray]) -> Dict[str, np.ndarray]:
    """Run inference on the ONNX model with the provided input data."""
    outputs = session.run(None, input_data)
    return {output_meta.name: output_val for output_meta, output_val in zip(session.get_outputs(), outputs)}
