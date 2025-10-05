import logging
from pathlib import Path
from fast_transit import fit_trapezoid_from_csv

logging.basicConfig(level=logging.INFO)

# Example with local CSV files
print("Running transit analysis with multiple local CSV files...")

# Use CSV files from the data directory (modify paths as needed)
csv_files = [
    "./data/UID_0013192_data_AXA_001.csv",
    "./data/UID_0013192_data_AXA_002.csv",
]

output_dir = Path("./local_files_example_plots")

# Process each CSV file
for i, csv_file in enumerate(csv_files):
    print(f"\nProcessing file {i+1}: {csv_file}")
    
    # Create a subdirectory for each file
    file_output_dir = output_dir / f"file_{i+1}"
    
    # Fit trapezoid model to the CSV data
    params = fit_trapezoid_from_csv(csv_file, outdir=file_output_dir)
    
    # Unpack the fitted parameters
    t0_fit, depth_fit, duration_fit, ingress_fit, baseline_fit = params
    
    print(f"  Transit midpoint (t0): {t0_fit:.6f} days")
    print(f"  Transit depth (delta): {depth_fit:.6f}")
    print(f"  Transit duration (T): {duration_fit:.6f} days")

print(f"\nResults saved to {output_dir}")
print("✅ Local CSV files example completed!")
