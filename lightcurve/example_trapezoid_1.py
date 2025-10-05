from pathlib import Path
import logging
from fast_transit import fit_trapezoid_from_csv

logging.basicConfig(level=logging.INFO)

# Example using local CSV file for trapezoid fitting
print("Running trapezoid fitting with local CSV file...")

# Analyze a sample CSV file from the data directory
csv_file = Path("./data/UID_0300007_data_AXA_025.csv")
output_dir = Path("./results_trapezoid")

# Fit trapezoid model to the CSV data
params = fit_trapezoid_from_csv(csv_file, outdir=output_dir)

# Unpack the fitted parameters (tuple of 5 values)
t0_fit, depth_fit, duration_fit, ingress_fit, baseline_fit = params

# Print results
print(f"\n{'='*80}")
print("RESULTS - Trapezoid Fitting Example")
print('='*80)
print(f"CSV file: {csv_file}")

# Print fitted parameters
print("Fitted trapezoid parameters:")
print(f"  Transit midpoint (t0): {t0_fit:.6f} days")
print(f"  Transit depth (delta): {depth_fit:.6f}")
print(f"  Transit duration (T): {duration_fit:.6f} days")
print(f"  Ingress/egress (tau): {ingress_fit:.6f} days")
print(f"  Baseline flux: {baseline_fit:.6f}")

print(f"\nResults saved to {output_dir}")
print("✅ Trapezoid fitting example completed!")
