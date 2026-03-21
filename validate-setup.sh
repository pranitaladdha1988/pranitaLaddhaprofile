#!/usr/bin/env bash
# Quick validation script to check setup

echo "🔍 Checking project structure..."
echo ""

# Check Backend files
echo "Backend files:"
if [ -f Backend/.env ]; then echo "  ✅ Backend/.env exists"; else echo "  ❌ Backend/.env missing"; fi
if [ -f Backend/main.py ]; then echo "  ✅ Backend/main.py exists"; else echo "  ❌ Backend/main.py missing"; fi
if [ -f Backend/rag.py ]; then echo "  ✅ Backend/rag.py exists"; else echo "  ❌ Backend/rag.py missing"; fi
if [ -f Backend/requirements.txt ]; then echo "  ✅ Backend/requirements.txt exists"; else echo "  ❌ Backend/requirements.txt missing"; fi

echo ""
echo "Frontend files:"
if [ -f src/services/chatbotApi.js ]; then echo "  ✅ src/services/chatbotApi.js exists"; else echo "  ❌ src/services/chatbotApi.js missing"; fi
if [ -f src/components/Chatbot.jsx ]; then echo "  ✅ src/components/Chatbot.jsx exists"; else echo "  ❌ src/components/Chatbot.jsx missing"; fi
if [ -f .env.local ]; then echo "  ✅ .env.local exists"; else echo "  ❌ .env.local missing"; fi

echo ""
echo "📋 Backend .env configuration:"
if grep -q "OPENAI_API_KEY" Backend/.env; then 
  echo "  ✅ OPENAI_API_KEY found"
else 
  echo "  ❌ OPENAI_API_KEY not found"
fi

if grep -q "BACKEND_PORT=8000" Backend/.env; then
  echo "  ✅ BACKEND_PORT=8000"
else
  echo "  ⚠️  BACKEND_PORT not set to 8000"
fi

if grep -q "5174" Backend/.env; then
  echo "  ✅ Port 5174 in CORS_ORIGINS"
else
  echo "  ⚠️  Port 5174 may not be in CORS_ORIGINS"
fi

echo ""
echo "📋 Frontend .env.local configuration:"
if grep -q "VITE_API_URL" .env.local; then
  echo "  ✅ VITE_API_URL found"
else
  echo "  ❌ VITE_API_URL not found"
fi

echo ""
echo "✅ Validation complete!"
echo ""
echo "Next steps:"
echo "1. cd Backend && source venv/bin/activate && python main.py"
echo "2. npm run dev"
echo "3. Open http://localhost:5174"
