from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse, FileResponse, RedirectResponse
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

import resend
import jwt
from datetime import datetime, timedelta

# Configuration
RESEND_API_KEY = settings.resend_api_key
JWT_SECRET = settings.jwt_secret
SITE_URL = "http://localhost:5173" # For local dev
resend.api_key = RESEND_API_KEY

@app.post("/api/resume/lead")
async def capture_lead(lead: Lead, request: Request):
    """Capture lead info and send verification email"""
    try:
        # Create a JWT token - valid for 1 hour
        payload = {
            "email": lead.email,
            "name": lead.name,
            "company": lead.company or "N/A",
            "exp": datetime.utcnow() + timedelta(hours=1),
            "action": "verify_resume"
        }
        token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")
        
        verify_link = f"http://localhost:8001/api/resume/verify?token={token}"
        
        # Send Email via Resend
        if RESEND_API_KEY != "re_placeholder":
            logger.info(f"Sending REAL verification email to {lead.email}...")
            resend.Emails.send({
                "from": "Resume <onboarding@resend.dev>",
                "to": lead.email,
                "subject": "Verify your email to download Pranita's Resume",
                "html": f"""
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
                  <h2 style="font-weight: 300; letter-spacing: -1px;">Pranita Laddha resume</h2>
                  <p style="margin: 30px 0; line-height: 1.6;">Hello {lead.name},</p>
                  <p style="line-height: 1.6;">Click the button below to verify your email and download my resume.</p>
                  <a href="{verify_link}" style="display: inline-block; background: #000; color: #fff; padding: 15px 30px; text-decoration: none; font-size: 11px; font-weight: 700; letter-spacing: 2px; margin: 20px 0;">VERIFY & DOWNLOAD</a>
                </div>
                """
            })
        else:
            logger.info(f"MOCK EMAIL TO {lead.email} - LINK: {verify_link}")

        return {"status": "success", "message": "Verification email sent"}
    except Exception as e:
        logger.error(f"Error initiating verification: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to initiate verification")


@app.get("/api/resume/verify")
async def verify_resume(token: str):
    """Verify JWT and redirect to file download"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        # Save to leads.json upon verification
        lead_record = {
            "name": payload.get("name", "Unknown"),
            "email": payload.get("email", "Unknown"),
            "company": payload.get("company", "N/A"),
            "timestamp": datetime.now().isoformat(),
            "status": "verified"
        }
        save_lead(lead_record)
        
        # Redirect to the actual download route
        download_url = f"http://localhost:8001/api/resume/download/{token}"
        return RedirectResponse(url=download_url)
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=403, detail="Verification link expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=403, detail="Invalid verification link")

@app.get("/api/resume/download/{token}")
async def download_resume(token: str):
    """Serve the resume PDF if JWT is valid"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        
        resume_path = os.path.join(os.path.dirname(__file__), "pdf", "resume.pdf")
        if not os.path.exists(resume_path):
            raise HTTPException(status_code=404, detail="Resume file not found")
        
        return FileResponse(
            path=resume_path,
            filename="Pranita_Laddha_Resume.pdf",
            media_type="application/pdf"
        )
    except Exception as e:
        raise HTTPException(status_code=403, detail="Invalid or expired download link")

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
