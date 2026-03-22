from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    openai_api_key: str
    openai_model: str = "gpt-4"
    backend_port: int = 8001
    backend_host: str = "0.0.0.0"
    cors_origins: str = "http://localhost:5173,http://localhost:5174,http://localhost:3000,http://127.0.0.1:5173,http://127.0.0.1:5174,http://127.0.0.1:3000"
    
    # New security settings
    resend_api_key: str = "re_placeholder"
    jwt_secret: str = "resume_secret_123"
    
    class Config:
        env_file = ".env", ".env.local" # Load from both, .env.local overrides
        case_sensitive = False
    
    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.cors_origins.split(",")]

settings = Settings()
