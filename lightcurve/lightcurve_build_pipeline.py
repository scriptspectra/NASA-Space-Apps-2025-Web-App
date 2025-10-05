import logging
import numpy as np
from lightkurve import LightCurve
from lightkurve.periodogram import BoxLeastSquaresPeriodogram
from lightkurve.targetpixelfile import TargetPixelFile
from typing import Any
from config import PipelineConfig, PipelineResult
from pixelfiles_loader import load_tpfs
from lightcurve_builder import build_lightcurve_from_tpfs

def run_pipeline(
    local_paths: list[str] | str | None = None,
    cfg: PipelineConfig | None = None,
) -> PipelineResult:
    """
    Run the full transit pipeline using local TPF files.
    
    Parameters:
        local_paths: Local TPF FITS file paths (can be single file, list of files, 
                    directory path, or glob pattern)
        cfg: Pipeline configuration (uses defaults if None)
        
    Returns:
        Pipeline results
    """
    if cfg is None:
        cfg = PipelineConfig()
    
    if not local_paths:
        raise ValueError("local_paths is required - provide path(s) to local TPF files.")
    
    logging.info("Loading TPFs from local files...")
    tpfs = load_tpfs(local_paths)
    
    result = build_lightcurve_from_tpfs(tpfs, cfg)
    
    return result
