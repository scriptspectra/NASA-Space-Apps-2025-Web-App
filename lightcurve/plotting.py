import logging
import matplotlib.pyplot as plt
from pathlib import Path
from config import PipelineResult

def plot_results(result: PipelineResult, outdir: Path | None = None) -> None:
    """Generate quick-look plots for pipeline results."""
    logging.info("="*80)
    logging.info("Generating plots...")
    logging.info("="*80)
    
    # Plot 1: Raw and flattened light curves
    fig, axes = plt.subplots(2, 1, figsize=(12, 8))
    
    result.lc_raw.plot(ax=axes[0], label="Raw")
    axes[0].set_title("Raw Light Curve")
    axes[0].legend()
    
    result.lc_flat.plot(ax=axes[1], label="Flattened", c="C1")
    axes[1].set_title("Flattened Light Curve")
    axes[1].legend()
    
    plt.tight_layout()
    if outdir:
        outdir.mkdir(parents=True, exist_ok=True)
        plt.savefig(outdir / "01_lightcurves.png", dpi=150)
        plt.close()
    else:
        plt.show()
    
    # Plot 2: BLS periodogram
    fig, ax = plt.subplots(figsize=(12, 6))
    result.periodogram.plot(ax=ax)
    ax.axvline(result.best_period, color="r", linestyle="--",
               label=f"Best: {result.best_period:.4f} d")
    ax.set_title("BLS Periodogram")
    ax.legend()
    
    plt.tight_layout()
    if outdir:
        plt.savefig(outdir / "02_periodogram.png", dpi=150)
        plt.close()
    else:
        plt.show()
    
    # Plot 3: Folded light curve
    fig, ax = plt.subplots(figsize=(10, 6))
    result.folded_lc.plot(ax=ax, c="k", marker=".", linestyle="",
                          markersize=2, alpha=0.5)
    ax.set_title(f"Folded Light Curve (Period = {result.best_period:.6f} days)")
    ax.set_xlabel("Phase")
    ax.set_ylabel("Normalized Flux")
    
    plt.tight_layout()
    if outdir:
        plt.savefig(outdir / "03_folded.png", dpi=150)
        plt.close()
    else:
        plt.show()
    
    logging.info("="*80)
