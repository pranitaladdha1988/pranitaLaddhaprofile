# CORS Error Fix - Setup Instructions

## Issue
Your frontend (running on port 5174) is getting CORS errors when trying to communicate with the backend API on port 8000.

## Solution

### Step 1: Activate Virtual Environment
```bash
cd Backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### Step 2: Install Dependencies (if not already done)
```bash
pip install -r requirements.txt
```

### Step 3: Set Up Environment Variables
Make sure `.env` file in the `Backend` folder has your OpenAI API key:
```
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-4
BACKEND_PORT=8000
BACKEND_HOST=0.0.0.0
CORS_ORIGINS=http://localhost:5174,http://127.0.0.1:5174
```

### Step 4: Start Backend Server
```bash
python main.py
```

You should see output like:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Step 5: Test Backend is Running
In a new terminal, test the health endpoint:
```bash
curl http://0.0.0.0:8000/health
```

Or open in browser: `http://0.0.0.0:8000/health`

### Step 6: Keep Backend Running and Test Frontend
With backend running, your frontend on `http://127.0.0.1:5174` should now successfully communicate with the chatbot API without CORS errors.

## Changes Made
- Updated `Backend/main.py` to allow all origins (`allow_origins=["*"]`) for development
- Added OPTIONS endpoint for CORS preflight requests
- Added `test_backend.py` script for quick testing

## If Still Getting CORS Errors

1. **Check backend is running:**
   - Should see "Uvicorn running on http://0.0.0.0:8000"
   - Try accessing `http://127.0.0.1:8000/` in browser

2. **Check frontend console (F12):**
   - Look for exact error message
   - Check if API URL is correct: should be `http://127.0.0.1:8000`

3. **Check CORS middleware:**
   - Backend CORS is now set to allow all origins
   - This is for development only - restrict in production

## Production CORS Configuration
For production, update `Backend/main.py` to use specific origins:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
