from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import logging
import json
import os
import uuid
from datetime import datetime
from config import settings
from rag import RAGApplication

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Chatbot API",
    description="API for AI chatbot with RAG and OpenAI integration",
    version="1.0.0"
)

# Add CORS middleware - Allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG application
try:
    rag_app = RAGApplication()
    logger.info("RAG application initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize RAG application: {str(e)}")
    logger.error("Make sure OPENAI_API_KEY is set in .env file")
    rag_app = None

# Request/Response Models
class Message(BaseModel):
    role: str  # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    message: str
    conversation_history: Optional[List[Message]] = None
    context: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    status: str

class Lead(BaseModel):
    name: str
    email: str
    company: Optional[str] = None

# Global state for temporary tokens (in-memory for now, simple for local use)
# Format: {token: {"email": email, "expires": timestamp}}
download_tokens = {}

LEADS_FILE = "leads.json"

def save_lead(lead_data: dict):
    leads = []
    if os.path.exists(LEADS_FILE):
        with open(LEADS_FILE, "r") as f:
            try:
                leads = json.load(f)
            except json.JSONDecodeError:
                leads = []
    
    leads.append(lead_data)
    with open(LEADS_FILE, "w") as f:
        json.dump(leads, f, indent=4)

# Routes
@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "ok",
        "message": "Chatbot API is running",
        "version": "1.0.0"
    }

@app.get("/health")
async def health():
    """Detailed health check"""
    return {
        "status": "healthy",
        "model": settings.openai_model,
        "backend_host": settings.backend_host,
        "backend_port": settings.backend_port
    }

@app.options("/chat")
async def options_chat():
    """Handle CORS preflight requests"""
    return {"status": "ok"}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Main chat endpoint for chatbot
    
    Request:
        - message: User's message
        - conversation_history: Optional conversation history
        - context: Optional context for RAG
    
    Response:
        - response: AI response
        - status: Request status
    """
    try:
        if not rag_app:
            raise HTTPException(status_code=503, detail="RAG application not initialized. Check OPENAI_API_KEY.")
        
        if not request.message or request.message.strip() == "":
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        logger.info(f"Received chat request: {request.message[:50]}...")
        
        # Retrieve context if not provided
        context = request.context or await rag_app.retrieve_context(request.message)
        
        # Process query with RAG
        response = await rag_app.process_query(request.message, context)
        
        logger.info(f"Chat request processed successfully")
        
        return ChatResponse(
            response=response,
            status="success"
        )
    
    except HTTPException as he:
        logger.error(f"HTTP Error: {he.detail}")
        raise he
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    """
    Streaming chat endpoint for real-time responses
    """
    try:
        if not request.message or request.message.strip() == "":
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        context = request.context or await rag_app.retrieve_context(request.message)
        response = await rag_app.process_query(request.message, context)
        
        return JSONResponse(
            content={"response": response, "status": "success"},
            media_type="application/json"
        )
    except Exception as e:
        logger.error(f"Error in streaming endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/resume/lead")
async def capture_lead(lead: Lead, request: Request):
    """Capture lead info and return a download token"""
    try:
        token = str(uuid.uuid4())
        timestamp = datetime.now().isoformat()
        
        lead_record = {
            "name": lead.name,
            "email": lead.email,
            "company": lead.company,
            "timestamp": timestamp,
            "ip": request.client.host,
            "user_agent": request.headers.get("user-agent"),
            "token": token
        }
        
        save_lead(lead_record)
        
        # Store token for download validation (valid for 10 minutes)
        download_tokens[token] = {
            "email": lead.email,
            "created_at": timestamp
        }
        
        return {"token": token, "status": "success"}
    except Exception as e:
        logger.error(f"Error capturing lead: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to initiate download")

@app.get("/api/resume/download/{token}")
async def download_resume(token: str):
    """Serve the resume PDF if token is valid"""
    if token not in download_tokens:
        raise HTTPException(status_code=403, detail="Invalid or expired download link")
    
    # Path to resume
    resume_path = os.path.join(os.path.dirname(__file__), "pdf", "resume.pdf")
    
    if not os.path.exists(resume_path):
        logger.error(f"Resume file not found at {resume_path}")
        raise HTTPException(status_code=404, detail="Resume file not found")
    
    # Optional: Log the download event
    logger.info(f"Resume downloaded by {download_tokens[token]['email']}")
    
    # Clean up token after use (single-use token for security)
    # del download_tokens[token] 
    
    return FileResponse(
        path=resume_path,
        filename="Pranita_Laddha_Resume.pdf",
        media_type="application/pdf"
    )

# Error handling
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"Unhandled exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host=settings.backend_host,
        port=settings.backend_port,
        log_level="info"
    )
