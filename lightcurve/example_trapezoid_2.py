from pathlib import Path
from plotting import plot_results
from fast_transit import fit_trapezoid_from_csv

# Pass the final_lightcurve to the trapezoid fitting function
params = fit_trapezoid_from_csv(csv_file=Path("./data/UID_0057087_data_AXA_010.csv"), outdir=Path("./trapezoid_fit_plots"))

# Unpack the fitted parameters (tuple of 5 values)
t0_fit, depth_fit, duration_fit, ingress_fit, baseline_fit = params

# Print fitted parameters
print("Fitted trapezoid parameters:")
print(f"  Transit midpoint (t0): {t0_fit:.6f} days")
print(f"  Transit depth (delta): {depth_fit:.6f}")
print(f"  Transit duration (T): {duration_fit:.6f} days")
print(f"  Ingress/egress (tau): {ingress_fit:.6f} days")
print(f"  Baseline flux: {baseline_fit:.6f}")
