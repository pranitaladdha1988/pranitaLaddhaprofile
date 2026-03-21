# Complete Setup & Debugging Guide

## Issues Found & Fixed

### Backend Issues Fixed:
1. ✅ **RAG async/sync mismatch** - LangChain `.invoke()` is synchronous, fixed async wrapper
2. ✅ **Missing error handling** - Added logging for initialization failures  
3. ✅ **CORS origins** - Updated `.env` with all required ports (5173, 5174)
4. ✅ **RAG initialization** - Added proper error handling if OpenAI key is missing

### Frontend Issues Checked:
✅ API service properly structured
✅ Chatbot component correctly calls API
✅ Error handling in place

---

## Complete Startup Instructions

### Terminal 1: Start Backend

```bash
# Navigate to backend
cd Backend

# Activate virtual environment
source venv/bin/activate
# On Windows: venv\Scripts\activate

# Verify Python version (should be 3.8+)
python --version

# Install dependencies (if not already done)
pip install -r requirements.txt

# Start the server
python main.py
```

**Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

### Terminal 2: Test Backend Connection

```bash
# While backend is running, test it
curl http://127.0.0.1:8000/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "model": "gpt-4",
  "backend_host": "0.0.0.0",
  "backend_port": 8000
}
```

### Terminal 3: Start Frontend

```bash
# Navigate to project root
cd ..

# Start development server
npm run dev
```

**Expected Output:**
```
  VITE v... ready in ... ms

  ➜  Local:   http://localhost:5174/
  ➜  press h to show help
```

---

## Testing the Flow

1. Open browser: `http://localhost:5174`
2. Open DevTools (F12)
3. Go to Console tab
4. Look for: `Chatbot API URL: http://127.0.0.1:8000`
5. Type a message in the chatbot
6. Should see in console:
   - `Sending message to: http://127.0.0.1:8000/chat`
   - `API Response: {response: "...", status: "success"}`

---

## Troubleshooting

### Error: "Cannot find module requests"
**Solution:** Ensure virtual environment is activated
```bash
source venv/bin/activate
pip install requests
```

### Error: "OPENAI_API_KEY not found"
**Solution:** 
1. Check `.env` file exists in `Backend` folder
2. Verify it contains: `OPENAI_API_KEY=sk-...`
3. Restart the backend server

### Error: "CORS error in browser console"
**Solution:**
1. Backend must be running on port 8000
2. Frontend must be running on port 5173 or 5174
3. Both URLs must match configuration
4. Restart both servers

### Error: "Connection refused" / "Cannot reach server"
**Solution:**
1. Check backend is actually running (see "Expected Output" above)
2. Try accessing `http://127.0.0.1:8000/` directly in browser
3. Make sure port 8000 is not blocked by firewall
4. Try restarting the backend server

### Error: "Invalid OpenAI API key"
**Solution:**
1. Verify API key is correct in `.env`
2. Check API key hasn't expired or been revoked on OpenAI dashboard
3. Key should start with `sk-`

---

## File Locations Reference

```
project-root/
├── Backend/
│   ├── .env                    ← Your OpenAI key goes here
│   ├── main.py                 ← FastAPI server
│   ├── rag.py                  ← RAG logic (FIXED)
│   ├── config.py               ← Configuration
│   └── requirements.txt         ← Dependencies
│
└── src/
    ├── services/
    │   └── chatbotApi.js       ← Frontend API client
    ├── components/
    │   └── Chatbot.jsx         ← Chatbot UI
    └── .env.local              ← Frontend env vars
```

---

## Production vs Development

### Current Configuration (Development)
- CORS: Allows all origins (`["*"]`)
- OpenAI Model: gpt-4
- Logging: Info level

### For Production, Update:

**Backend/main.py:**
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Backend/.env:**
```
OPENAI_MODEL=gpt-3.5-turbo  # Cheaper alternative
BACKEND_HOST=0.0.0.0  # Change to specific IP if needed
```

---

## Next Steps

1. ✅ Start both servers as described above
2. ✅ Test in browser at `http://localhost:5174`
3. ✅ Type a message in chatbot
4. ✅ Should get response from GPT-4
5. Continue building features!

---

## Getting Help

Check the logs in:
- **Backend logs:** Terminal where you ran `python main.py`
- **Frontend logs:** Browser DevTools Console (F12)
- **Backend health:** Visit `http://127.0.0.1:8000/health` in browser
