# FastAPI Chatbot Backend with OpenAI and RAG

This is the backend API for your portfolio website's chatbot, powered by FastAPI, OpenAI, and RAG (Retrieval-Augmented Generation).

## Features

- **FastAPI**: Modern, fast web framework for building APIs
- **OpenAI Integration**: Uses GPT-4 for intelligent responses
- **RAG (Retrieval-Augmented Generation)**: Provides context-aware responses
- **CORS Enabled**: Ready to communicate with your React frontend
- **Environment Configuration**: Easy setup with `.env` file

## Setup

### 1. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

Copy `.env.example` to `.env` and add your OpenAI API key:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=sk-your-api-key-here
OPENAI_MODEL=gpt-4
BACKEND_PORT=8000
BACKEND_HOST=0.0.0.0
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 4. Run the Server

```bash
python main.py
```

The API will be available at `http://0.0.0.0:8000`

## API Endpoints

### Health Check
```
GET /
GET /health
```

### Chat Endpoint
```
POST /chat
Content-Type: application/json

{
    "message": "Your question here",
    "conversation_history": [],
    "context": ""
}
```

### API Documentation

Once the server is running, visit:
- **Swagger UI**: `http://0.0.0.0:8000/docs`
- **ReDoc**: `http://0.0.0.0:8000/redoc`

## Project Structure

```
Backend/
├── main.py              # FastAPI application and routes
├── config.py            # Configuration and settings
├── rag.py               # RAG application logic
├── requirements.txt     # Python dependencies
├── .env.example         # Environment variables template
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## Integration with Frontend

Your React chatbot component can call the API like this:

```javascript
const response = await fetch('http://0.0.0.0:8000/chat', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        message: userMessage,
        conversation_history: [],
        context: ""
    })
});
const data = await response.json();
console.log(data.response);
```

## Next Steps

1. Add your OpenAI API key to `.env`
2. Implement actual context retrieval in `rag.py` (connect to a vector database)
3. Enhance conversation history management
4. Add database integration for conversation storage
5. Implement authentication if needed

## Dependencies

- **FastAPI**: Web framework
- **Uvicorn**: ASGI server
- **OpenAI**: OpenAI API client
- **Langchain**: LLM orchestration and RAG
- **Pydantic**: Data validation
- **python-dotenv**: Environment configuration

## License

MIT
