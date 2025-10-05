from pathlib import Path
import logging
from fast_transit import fit_trapezoid_from_csv

logging.basicConfig(level=logging.INFO)

# Example using local CSV file
print("Running transit analysis with local CSV file...")

# Analyze a sample CSV file from the data directory
csv_file = Path("./data/UID_0057087_data_AXA_010.csv")
output_dir = Path("./tess_example_plots")

# Fit trapezoid model to the CSV data
params = fit_trapezoid_from_csv(csv_file, outdir=output_dir)

# Unpack the fitted parameters
t0_fit, depth_fit, duration_fit, ingress_fit, baseline_fit = params

# Print results
print(f"\n{'='*80}")
print("RESULTS - Local CSV Example")
print('='*80)
print(f"CSV file: {csv_file}")
print(f"Transit midpoint (t0): {t0_fit:.6f} days")
print(f"Transit depth (delta): {depth_fit:.6f}")
print(f"Transit duration (T): {duration_fit:.6f} days")
print(f"Ingress/egress (tau): {ingress_fit:.6f} days")
print(f"Baseline flux: {baseline_fit:.6f}")

print(f"\nResults saved to {output_dir}")
print("✅ Local CSV example completed!")
