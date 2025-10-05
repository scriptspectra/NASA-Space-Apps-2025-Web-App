import sys
from pathlib import Path
import numpy as np
import pandas as pd
from scipy.optimize import curve_fit
import matplotlib.pyplot as plt
from typing import Any, Tuple


def lc_to_arrays(lc: Any) -> Tuple[np.ndarray, np.ndarray]:
    """Convert a lightkurve.LightCurve-like object to (time, flux) numpy arrays.

    This function is lenient: it tries `lc.to_pandas()` first (recommended),
    then falls back to reading `lc.time`/`lc.flux` attributes.
    """
    # Try the convenient to_pandas() path first
    try:
        df = lc.to_pandas().reset_index().rename(columns={"index": "time"})

        def _to_float(t):
            if hasattr(t, "to_value"):
                return t.to_value()
            if hasattr(t, "value"):
                return t.value
            return float(t)

        df["time"] = df["time"].apply(_to_float)
        df = df.dropna(subset=["time", "flux"])
        return np.array(df["time"], dtype=float), np.array(df["flux"], dtype=float)
    except Exception:
        # Fallback: try attribute-like access
        time_arr = lc.time.value if hasattr(lc.time, "value") else np.array(lc.time)
        flux_arr = lc.flux if isinstance(lc.flux, np.ndarray) else np.array(lc.flux)
        return np.array(time_arr, dtype=float), np.array(flux_arr, dtype=float)

# --- Trapezoidal transit model ---
def trapezoid_model(t, t0, depth, duration, ingress, baseline):
    tau = ingress
    T = duration
    d = depth
    t1 = t0 - T/2
    t2 = t0 - tau/2
    t3 = t0 + tau/2
    t4 = t0 + T/2
    y = np.ones_like(t) * baseline
    # Ingress
    mask_ingress = (t >= t1) & (t < t2)
    y[mask_ingress] -= d * (t[mask_ingress] - t1) / (t2 - t1)
    # Flat bottom
    mask_flat = (t >= t2) & (t <= t3)
    y[mask_flat] -= d
    # Egress
    mask_egress = (t > t3) & (t <= t4)
    y[mask_egress] -= d * (1 - (t[mask_egress] - t3) / (t4 - t3))
    return y


def fit_trapezoid_from_arrays(time: np.ndarray, flux: np.ndarray, outdir: Path | None = None):
    """Fit the trapezoidal transit model to arrays of time and flux.

    Returns fitted parameters (t0, depth, duration, ingress, baseline) and the covariance matrix.
    If plot is True, shows a quick matplotlib visual check.
    """
    # --- Initial guesses ---
    t0_guess = time[np.argmin(flux)]              # Midpoint: time of minimum flux
    depth_guess = np.median(np.abs(flux - np.median(flux)))  # Approximate depth
    duration_guess = 0.05                         # Duration (days), adjust as needed
    ingress_guess = 0.01                          # Ingress/egress duration (days)
    baseline_guess = np.median(flux)              # Out-of-transit baseline

    p0 = [t0_guess, depth_guess, duration_guess, ingress_guess, baseline_guess]

    # --- Fit the model ---
    popt, pcov = curve_fit(trapezoid_model, time, flux, p0=p0, maxfev=10000)
    t0_fit, depth_fit, duration_fit, ingress_fit, baseline_fit = popt

    # --- Print results ---
    print(f"Transit midpoint (t0):       {t0_fit:.6f} days")
    print(f"Transit depth (delta):      {depth_fit:.6f} (fractional)")
    print(f"Transit duration (T):       {duration_fit:.6f} days")
    print(f"Ingress/egress (tau):       {ingress_fit:.6f} days")
    print(f"Baseline flux (out-of-transit): {baseline_fit:.6f}")

    plt.tight_layout()
    if outdir:
        outdir.mkdir(parents=True, exist_ok=True)
        plt.plot(time, flux, '.k', label='Data')
        plt.plot(time, trapezoid_model(time, *popt), 'r-', label='Trapezoid fit')
        plt.xlabel('Time [days]')
        plt.ylabel('Flux')
        plt.legend()
        plt.title('Trapezoidal Transit Fit')
        plt.savefig(outdir / "04_fit_trapezoid.png", dpi=150)
        plt.close()
    else:
        # --- Plot for visual check ---
        plt.plot(time, flux, '.k', label='Data')
        plt.plot(time, trapezoid_model(time, *popt), 'r-', label='Trapezoid fit')
        plt.xlabel('Time [days]')
        plt.ylabel('Flux')
        plt.legend()
        plt.title('Trapezoidal Transit Fit')
        plt.show()

    return popt, pcov


def read_csv_lightcurve(csv_file: str | Path, time_col: str = 'time', flux_col: str = 'flux') -> Tuple[np.ndarray, np.ndarray]:
    """Read lightcurve data from a CSV file.
    
    Parameters:
    -----------
    csv_file : str or Path
        Path to the CSV file containing lightcurve data
    time_col : str, optional
        Name of the time column in the CSV file (default: 'time')
    flux_col : str, optional
        Name of the flux column in the CSV file (default: 'flux')
        
    Returns:
    --------
    time : np.ndarray
        Array of time values
    flux : np.ndarray
        Array of flux values
    """
    try:
        df = pd.read_csv(csv_file)
        
        # Check if required columns exist
        if time_col not in df.columns:
            raise ValueError(f"Time column '{time_col}' not found in CSV. Available columns: {list(df.columns)}")
        if flux_col not in df.columns:
            raise ValueError(f"Flux column '{flux_col}' not found in CSV. Available columns: {list(df.columns)}")
        
        # Remove rows with NaN values in time or flux columns
        df = df.dropna(subset=[time_col, flux_col])
        
        time = np.array(df[time_col], dtype=float)
        flux = np.array(df[flux_col], dtype=float)
        
        print(f"Successfully loaded {len(time)} data points from {csv_file}")
        return time, flux
        
    except Exception as e:
        raise ValueError(f"Error reading CSV file '{csv_file}': {str(e)}")


def fit_trapezoid_from_csv(csv_file: str | Path, time_col: str = 'time', flux_col: str = 'flux', outdir: Path | None = None):
    """Fit trapezoidal transit model to lightcurve data from a CSV file.
    
    Parameters:
    -----------
    csv_file : str or Path
        Path to the CSV file containing lightcurve data
    time_col : str, optional
        Name of the time column in the CSV file (default: 'time')
    flux_col : str, optional
        Name of the flux column in the CSV file (default: 'flux')
    outdir : Path, optional
        Directory to save the plot (if None, plot is displayed)
        
    Returns:
    --------
    tuple
        Fitted parameters (t0, depth, duration, ingress, baseline)
    """
    time, flux = read_csv_lightcurve(csv_file, time_col, flux_col)
    popt, _ = fit_trapezoid_from_arrays(time, flux, outdir=outdir)
    return tuple(popt)


def fit_trapezoid_from_lightcurve(lc: Any, outdir: Path | None = None):
    """Convenience wrapper: accept a lightkurve.LightCurve (or equivalent) and fit the model."""
    time, flux = lc_to_arrays(lc)
    popt, _ = fit_trapezoid_from_arrays(time, flux, outdir=outdir)
    return tuple(popt)
