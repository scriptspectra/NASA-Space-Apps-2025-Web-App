from dataclasses import dataclass
from lightkurve import LightCurve
from lightkurve.periodogram import BoxLeastSquaresPeriodogram
from lightkurve.targetpixelfile import TargetPixelFile
from typing import Any

@dataclass
class PipelineConfig:
    """
    Configuration for the transit pipeline.
    
    Attributes:
        window_length: Savitzky-Golay window for flattening (odd integer)
        polyorder: Polynomial order for Savitzky-Golay filter
        sigma_clip_lower: Lower sigma threshold for outlier removal
        sigma_clip_upper: Upper sigma threshold for outlier removal
        period_min: Minimum period for BLS search (days)
        period_max: Maximum period for BLS search (days)
        duration_min: Minimum transit duration for BLS (days)
        duration_max: Maximum transit duration for BLS (days)
    """
    # Flattening - reduced for faster processing
    window_length: int = 51  # Reduced from 101
    polyorder: int = 2
    
    # Outlier removal
    sigma_clip_lower: float = 20.0
    sigma_clip_upper: float = 3.0
    
    # BLS - optimized for faster search
    period_min: float = 0.5
    period_max: float = 10.0  # Reduced from 20.0
    duration_min: float = 0.01
    duration_max: float = 0.3


@dataclass
class FastPipelineConfig:
    """
    Fast configuration for web usage - optimized for speed over precision.
    """
    # Flattening - minimal for speed
    window_length: int = 25
    polyorder: int = 1
    
    # Outlier removal - less aggressive
    sigma_clip_lower: float = 10.0
    sigma_clip_upper: float = 5.0
    
    # BLS - reduced search space
    period_min: float = 1.0
    period_max: float = 5.0
    duration_min: float = 0.02
    duration_max: float = 0.2


@dataclass
class PipelineResult:
    """
    Results from the transit pipeline.
    
    Attributes:
        tpfs: List of target pixel files
        lc_raw: Raw light curve (stitched from all TPFs)
        lc_flat: Flattened light curve
        lc_clean: Cleaned light curve (outliers removed)
        periodogram: BLS periodogram
        best_period: Best period found by BLS (days)
        folded_lc: Phase-folded light curve
    """
    tpfs: list[TargetPixelFile]
    lc_raw: LightCurve
    lc_flat: LightCurve
    lc_clean: LightCurve
    periodogram: BoxLeastSquaresPeriodogram
    best_period: float
    folded_lc: LightCurve
