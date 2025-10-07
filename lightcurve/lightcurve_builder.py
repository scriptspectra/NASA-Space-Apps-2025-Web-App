from dataclasses import dataclass
import logging
import numpy as np
from lightkurve import LightCurve
from lightkurve.periodogram import BoxLeastSquaresPeriodogram
from lightkurve.targetpixelfile import TargetPixelFile
from typing import Any
from config import PipelineConfig, PipelineResult

def build_lightcurve_from_tpfs(
    tpfs: list[TargetPixelFile], 
    cfg: PipelineConfig
) -> PipelineResult:
    """
    Build light curve from TPFs, flatten, clean, run BLS, and fold.
    
    Steps:
        2. Create light curve (stitched from all TPFs)
        3. Flatten
        4. Transit-safe outlier removal
        5. BLS periodogram
        6. Fold on best period
    """
    # Step 2: Create light curve
    logging.info("="*80)
    logging.info("STEP 2: Creating light curve from TPFs...")
    logging.info("="*80)
    
    lcs = []
    for i, tpf in enumerate(tpfs, start=1):
        try:
            lc = tpf.to_lightcurve(aperture_mask="pipeline")
            lcs.append(lc)
            logging.info(f"  ✓ TPF {i}/{len(tpfs)}: {len(lc)} cadences")
        except Exception as e:
            logging.warning(f"  ✗ TPF {i}/{len(tpfs)} failed: {e}")
    
    if not lcs:
        raise RuntimeError("Failed to create any light curves from TPFs.")
    
    lc_raw = lcs[0] if len(lcs) == 1 else lcs[0].append(lcs[1:])
    lc_raw = lc_raw.remove_nans()
    logging.info(f"Raw light curve: {len(lc_raw)} cadences")
    
    # Step 3: Flatten
    logging.info("="*80)
    logging.info("STEP 3: Flattening light curve...")
    logging.info("="*80)
    lc_flat = lc_raw.flatten(
        window_length=cfg.window_length, 
        polyorder=cfg.polyorder
    )
    logging.info(f"  ✓ Flattened: {len(lc_flat)} cadences")
    
    # Step 4: Outlier removal
    logging.info("="*80)
    logging.info("STEP 4: Removing outliers...")
    logging.info("="*80)
    lc_clean = lc_flat.remove_outliers(
        sigma_lower=cfg.sigma_clip_lower,
        sigma_upper=cfg.sigma_clip_upper
    )
    n_removed = len(lc_flat) - len(lc_clean)
    logging.info(f"  ✓ Removed {n_removed} outliers; {len(lc_clean)} cadences remain")
    
    # Step 5: BLS periodogram
    logging.info("="*80)
    logging.info("STEP 5: Running BLS periodogram...")
    logging.info("="*80)
    logging.info(f"  Period range: [{cfg.period_min}, {cfg.period_max}] days")
    
    periodogram = lc_clean.to_periodogram(
        method="bls",
        period=np.linspace(cfg.period_min, cfg.period_max, 10000),
        duration=np.linspace(cfg.duration_min, cfg.duration_max, 100),
    )
    best_period = periodogram.period_at_max_power.value
    max_power = periodogram.max_power
    logging.info(f"  ✓ Best period: {best_period:.6f} days (power={max_power:.4f})")
    
    # Step 6: Fold
    logging.info("="*80)
    logging.info("STEP 6: Folding light curve...")
    logging.info("="*80)
    folded_lc = lc_clean.fold(period=best_period)
    logging.info(f"  ✓ Folded: {len(folded_lc)} cadences")
    
    return PipelineResult(
        tpfs=tpfs,
        lc_raw=lc_raw,
        lc_flat=lc_flat,
        lc_clean=lc_clean,
        periodogram=periodogram,
        best_period=best_period,
        folded_lc=folded_lc,
    )
