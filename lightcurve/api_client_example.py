#!/usr/bin/env python3
"""
Example client script to demonstrate using the Lightcurve Analysis API.

This script shows how to:
1. Upload a FITS file
2. Get the folded lightcurve image
3. Extract transit parameters
4. Run ML inference

Usage:
    python api_client_example.py <fits_file_path>
"""

import requests
import sys
from pathlib import Path
import time
import json

API_BASE_URL = "http://localhost:9000/api/v1"

def upload_fits_file(fits_file_path: str) -> str:
    """Upload a FITS file and return the task ID"""
    url = f"{API_BASE_URL}/upload-fits"
    
    with open(fits_file_path, 'rb') as f:
        files = {'file': (Path(fits_file_path).name, f, 'application/octet-stream')}
        response = requests.post(url, files=files)
    
    if response.status_code == 200:
        result = response.json()
        print(f"✅ FITS file uploaded successfully!")
        print(f"   Task ID: {result['task_id']}")
        print(f"   Best Period: {result['best_period']:.6f} days")
        return result['task_id']
    else:
        print(f"❌ Failed to upload FITS file: {response.status_code}")
        print(f"   Error: {response.text}")
        return None

def get_folded_image(task_id: str, save_path: str = None) -> bool:
    """Download the folded lightcurve image"""
    url = f"{API_BASE_URL}/folded-image/{task_id}"
    response = requests.get(url)
    
    if response.status_code == 200:
        if save_path is None:
            save_path = f"folded_lightcurve_{task_id}.png"
        
        with open(save_path, 'wb') as f:
            f.write(response.content)
        
        print(f"✅ Folded lightcurve image saved to: {save_path}")
        return True
    else:
        print(f"❌ Failed to get folded image: {response.status_code}")
        print(f"   Error: {response.text}")
        return False

def extract_transit_parameters(task_id: str) -> dict:
    """Extract transit parameters using fast_transit workflow"""
    url = f"{API_BASE_URL}/transit-parameters/{task_id}"
    response = requests.post(url)
    
    if response.status_code == 200:
        result = response.json()
        print(f"✅ Transit parameters extracted successfully!")
        
        params = result['parameters']
        print(f"   t0 (transit midpoint): {params['t0']:.6f} days")
        print(f"   depth: {params['depth']:.6f}")
        print(f"   duration: {params['duration']:.6f} days")
        print(f"   baseline: {params['baseline']:.6f}")
        
        return params
    else:
        print(f"❌ Failed to extract transit parameters: {response.status_code}")
        print(f"   Error: {response.text}")
        return None

def run_ml_inference(task_id: str) -> dict:
    """Run ML model inference"""
    url = f"{API_BASE_URL}/ml-inference/{task_id}"
    response = requests.post(url)
    
    if response.status_code == 200:
        result = response.json()
        print(f"✅ ML inference completed successfully!")
        
        print(f"   Input parameters:")
        for key, value in result['input_parameters'].items():
            print(f"     {key}: {value:.6f}")
        
        print(f"   Inference results:")
        for key, value in result['inference_results'].items():
            print(f"     {key}: {value}")
        
        return result
    else:
        print(f"❌ Failed to run ML inference: {response.status_code}")
        print(f"   Error: {response.text}")
        return None

def check_health() -> bool:
    """Check API health"""
    url = f"{API_BASE_URL}/health"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            result = response.json()
            print(f"✅ API is healthy")
            print(f"   Model loaded: {result['model_loaded']}")
            print(f"   Version: {result['version']}")
            return True
        else:
            print(f"❌ API health check failed: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print(f"❌ Cannot connect to API at {API_BASE_URL}")
        print(f"   Make sure the API server is running on port 9000")
        return False

def cleanup_task(task_id: str) -> bool:
    """Clean up task files"""
    url = f"{API_BASE_URL}/cleanup/{task_id}"
    response = requests.delete(url)
    
    if response.status_code == 200:
        print(f"✅ Task {task_id} cleaned up successfully")
        return True
    else:
        print(f"❌ Failed to cleanup task: {response.status_code}")
        return False

def main():
    if len(sys.argv) != 2:
        print("Usage: python api_client_example.py <fits_file_path>")
        print("\nExample:")
        print("  python api_client_example.py ./pixelfiles/some_file.fits")
        sys.exit(1)
    
    fits_file_path = sys.argv[1]
    
    if not Path(fits_file_path).exists():
        print(f"❌ FITS file not found: {fits_file_path}")
        sys.exit(1)
    
    print("🚀 Starting Lightcurve Analysis API Demo")
    print("=" * 50)
    
    # Check API health
    print("\n1. Checking API health...")
    if not check_health():
        print("\n💡 To start the API server, run:")
        print("   python api.py")
        sys.exit(1)
    
    # Upload FITS file
    print(f"\n2. Uploading FITS file: {fits_file_path}")
    task_id = upload_fits_file(fits_file_path)
    if not task_id:
        sys.exit(1)
    
    # Get folded lightcurve image
    print(f"\n3. Downloading folded lightcurve image...")
    if not get_folded_image(task_id):
        print("   Continuing without image...")
    
    # Extract transit parameters
    print(f"\n4. Extracting transit parameters...")
    params = extract_transit_parameters(task_id)
    if not params:
        print("   Cannot continue without parameters")
        sys.exit(1)
    
    # Run ML inference
    print(f"\n5. Running ML inference...")
    inference_result = run_ml_inference(task_id)
    if not inference_result:
        print("   ML inference failed")
    
    # Cleanup (optional)
    print(f"\n6. Cleaning up...")
    cleanup_task(task_id)
    
    print("\n🎉 Demo completed successfully!")
    print("=" * 50)

if __name__ == "__main__":
    main()