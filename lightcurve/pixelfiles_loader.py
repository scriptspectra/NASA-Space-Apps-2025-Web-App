import logging
import os
import glob
from typing import List, Union
import lightkurve as lk
from lightkurve.targetpixelfile import TargetPixelFile
from pathlib import Path


def load_tpfs(paths: Union[str, List[str]]) -> List[TargetPixelFile]:
    """
    Load target pixel files from local FITS files.
    
    Parameters:
        paths: Path(s) to TPF FITS files. Can be:
               - Single file path (str)
               - List of file paths (List[str])
               - Directory path containing FITS files (str)
               - Glob pattern (str, e.g., "*.fits")
        
    Returns:
        List of loaded TPFs
    """
    # Convert single path to list
    if isinstance(paths, str):
        path = Path(paths)
        if path.is_dir():
            # If it's a directory, find all FITS files
            patterns = ["*.fits", "*.fit", "*.FITS", "*.FIT"]
            file_paths = []
            for pattern in patterns:
                file_paths.extend(glob.glob(str(path / pattern)))
            paths = file_paths
        elif "*" in paths or "?" in paths:
            # If it's a glob pattern
            paths = glob.glob(paths)
        else:
            # Single file
            paths = [paths]
    
    if not paths:
        raise ValueError("No FITS files found to load.")
    
    logging.info(f"Loading {len(paths)} local TPF file(s)...")
    tpfs = []
    
    for path in paths:
        try:
            if not os.path.exists(path):
                logging.warning(f"  ✗ File not found: {path}")
                continue
                
            tpf = lk.read(path)
            tpfs.append(tpf)
            logging.info(f"  ✓ Loaded {Path(path).name}")
        except Exception as e:
            logging.warning(f"  ✗ Failed to load {path}: {e}")
    
    if not tpfs:
        raise ValueError("No valid TPFs could be loaded from local files.")
    
    logging.info(f"Successfully loaded {len(tpfs)} TPF(s).")
    return tpfs


def load_single_tpf(path: str) -> TargetPixelFile:
    """
    Load a single target pixel file from a local FITS file.
    
    Parameters:
        path: Path to TPF FITS file
        
    Returns:
        Loaded TPF
    """
    if not os.path.exists(path):
        raise FileNotFoundError(f"File not found: {path}")
    
    try:
        logging.info(f"Loading TPF from {Path(path).name}...")
        tpf = lk.read(path)
        logging.info(f"  ✓ Successfully loaded {Path(path).name}")
        return tpf
    except Exception as e:
        raise ValueError(f"Failed to load TPF from {path}: {e}")


def validate_tpf_file(path: str) -> bool:
    """
    Validate if a file is a valid TPF FITS file.
    
    Parameters:
        path: Path to the file to validate
        
    Returns:
        True if valid TPF, False otherwise
    """
    try:
        if not os.path.exists(path):
            return False
        
        # Try to read the file
        tpf = lk.read(path)
        
        # Basic validation - check if it has expected TPF attributes
        required_attrs = ['time', 'flux', 'quality', 'pos_corr1', 'pos_corr2']
        for attr in required_attrs:
            if not hasattr(tpf, attr):
                return False
        
        return True
    except Exception:
        return False


def get_tpf_info(path: str) -> dict:
    """
    Get basic information about a TPF file without fully loading it.
    
    Parameters:
        path: Path to TPF FITS file
        
    Returns:
        Dictionary with TPF information
    """
    try:
        tpf = lk.read(path)
        
        info = {
            'filename': Path(path).name,
            'target_name': getattr(tpf, 'targetid', 'Unknown'),
            'mission': getattr(tpf, 'mission', 'Unknown'),
            'sector': getattr(tpf, 'sector', None),
            'quarter': getattr(tpf, 'quarter', None),
            'campaign': getattr(tpf, 'campaign', None),
            'cadence_type': getattr(tpf, 'cadenceno', 'Unknown'),
            'n_cadences': len(tpf.time) if hasattr(tpf, 'time') else 0,
            'start_time': float(tpf.time[0]) if hasattr(tpf, 'time') and len(tpf.time) > 0 else None,
            'end_time': float(tpf.time[-1]) if hasattr(tpf, 'time') and len(tpf.time) > 0 else None,
            'aperture_shape': tpf.flux.shape[1:] if hasattr(tpf, 'flux') else None
        }
        
        return info
    except Exception as e:
        return {'filename': Path(path).name, 'error': str(e)}
