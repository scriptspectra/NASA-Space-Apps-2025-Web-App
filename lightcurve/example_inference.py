from typing import Any, Dict
from pathlib import Path
import numpy as np
from fast_transit import fit_trapezoid_from_csv, read_csv_lightcurve
from inference import load_model, run_inference
import logging

logging.basicConfig(level=logging.INFO)

# Example using local CSV file for inference
print("Running transit analysis and inference with local CSV file...")

# Load CSV data
csv_file = Path("./data/UID_0098505_data_AXA_020.csv")
output_dir = Path("./inference_example_plots")

# Fit trapezoid model to the CSV data
params = fit_trapezoid_from_csv(csv_file, outdir=output_dir)

# Unpack the fitted parameters (tuple of 5 values)
t0_fit, depth_fit, duration_fit, ingress_fit, baseline_fit = params

# Print fitted parameters
print("Fitted trapezoid parameters:")
print(f"  Transit midpoint (t0): {t0_fit:.6f} days")
print(f"  Transit depth (delta): {depth_fit:.6f}")
print(f"  Transit duration (T): {duration_fit:.6f} days")
print(f"  Ingress/egress (tau): {ingress_fit:.6f} days")
print(f"  Baseline flux: {baseline_fit:.6f}")

# Example usage:
print("\nRunning inference...")
model_session = load_model("models/koi_rf_model.onnx")
# Create proper input dictionary for the ONNX model
input_features = np.array([[t0_fit, depth_fit, duration_fit, baseline_fit]], dtype=np.float32)
results = run_inference(model_session, {"float_input": input_features})

print("Inference results:", results)
print(f"\nResults saved to {output_dir}")
print("✅ Local CSV inference example completed!")
