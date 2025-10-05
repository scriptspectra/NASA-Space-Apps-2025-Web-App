#!/usr/bin/env python3
"""
Simple test script to verify the API is working
"""
import requests
import time

def test_health():
    """Test the health endpoint"""
    try:
        response = requests.get("http://localhost:9000/api/v1/health")
        if response.status_code == 200:
            result = response.json()
            print("✅ API Health Check Passed!")
            print(f"   Status: {result['status']}")
            print(f"   Model loaded: {result['model_loaded']}")
            print(f"   Version: {result['version']}")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API. Make sure it's running on port 9000")
        return False
    except Exception as e:
        print(f"❌ Error during health check: {e}")
        return False

def test_docs():
    """Test that the API docs are accessible"""
    try:
        response = requests.get("http://localhost:9000/docs")
        if response.status_code == 200:
            print("✅ API Documentation accessible at http://localhost:9000/docs")
            return True
        else:
            print(f"❌ API docs not accessible: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error accessing docs: {e}")
        return False

if __name__ == "__main__":
    print("🧪 Testing Lightcurve Analysis API")
    print("=" * 50)
    
    print("\n1. Testing API Health...")
    health_ok = test_health()
    
    print("\n2. Testing API Documentation...")
    docs_ok = test_docs()
    
    if health_ok and docs_ok:
        print("\n🎉 All tests passed! API is working correctly.")
        print("\n📖 Access the API documentation at: http://localhost:9000/docs")
        print("📖 Alternative docs at: http://localhost:9000/redoc")
    else:
        print("\n❌ Some tests failed. Check the API server.")