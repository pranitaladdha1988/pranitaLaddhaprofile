#!/usr/bin/env python
"""
Quick test script to verify backend is running and accessible
"""
import requests
import sys

API_URL = "http://127.0.0.1:8000"

def test_backend():
    print(f"Testing backend at {API_URL}...")
    
    # Test 1: Check health
    try:
        response = requests.get(f"{API_URL}/health")
        print(f"✓ Health check: {response.status_code}")
        print(f"  Response: {response.json()}")
    except Exception as e:
        print(f"✗ Health check failed: {e}")
        print("\nMake sure backend is running:")
        print("  cd Backend")
        print("  python main.py")
        return False
    
    # Test 2: Try a chat request
    try:
        payload = {
            "message": "Hello",
            "conversation_history": [],
            "context": ""
        }
        response = requests.post(f"{API_URL}/chat", json=payload)
        print(f"✓ Chat endpoint: {response.status_code}")
        print(f"  Response: {response.json()}")
    except Exception as e:
        print(f"✗ Chat request failed: {e}")
        return False
    
    print("\n✓ Backend is working correctly!")
    return True

if __name__ == "__main__":
    success = test_backend()
    sys.exit(0 if success else 1)
