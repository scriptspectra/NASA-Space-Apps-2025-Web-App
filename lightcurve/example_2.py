import logging
from pathlib import Path
from fast_transit import fit_trapezoid_from_csv

logging.basicConfig(level=logging.INFO)

# Example using a different CSV file
print("Running transit analysis with local CSV file (example 2)...")

# Analyze a different sample CSV file from the data directory
csv_file = Path("./data/UID_0300006_data_AXA_015.csv")
output_dir = Path("./kepler_example_plots")

# Fit trapezoid model to the CSV data
params = fit_trapezoid_from_csv(csv_file, outdir=output_dir)

# Unpack the fitted parameters
t0_fit, depth_fit, duration_fit, ingress_fit, baseline_fit = params

# Print and visualize
print(f"\n{'='*80}")
print("RESULTS - Local CSV Example 2")
print('='*80)
print(f"CSV file: {csv_file}")
print(f"Transit midpoint (t0): {t0_fit:.6f} days")
print(f"Transit depth (delta): {depth_fit:.6f}")
print(f"Transit duration (T): {duration_fit:.6f} days")
print(f"Ingress/egress (tau): {ingress_fit:.6f} days")
print(f"Baseline flux: {baseline_fit:.6f}")

print(f"\nResults saved to {output_dir}")
print("✅ Local CSV example 2 completed!")
