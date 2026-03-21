from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from config import settings
import logging

logger = logging.getLogger(__name__)

PROFILE_QA = [
    {
        "keywords": ["who are you", "about you", "your profile", "Pranita Laddha", "introduce yourself"],
        "answer": (
            "I am a software engineer with experience in AI, cloud technologies, "
            "and full-stack development. This chatbot is designed to answer "
            "questions about my professional profile."
        )
    },
    {
        "keywords": ["skills", "technologies", "tech stack", "technical skills"],
        "answer": (
            "My technical skills include Python, FastAPI, React, Azure, "
            "machine learning, REST APIs, and cloud-native application development."
        )
    },
    {
        "keywords": ["experience", "work experience", "background", "professional experience"],
        "answer": (
            "I have professional experience building AI-powered applications, "
            "backend APIs, and scalable cloud solutions using Azure."
        )
    },
    {
        "keywords": ["projects", "portfolio", "work", "projects you've done"],
        "answer": (
            "I have worked on AI chatbots, RAG-based systems, and full-stack "
            "applications deployed on Azure."
        )
    }
]

class RAGApplication:
    def __init__(self):
        try:
            self.llm = ChatOpenAI(
                api_key=settings.openai_api_key,
                model=settings.openai_model,
                temperature=0.7
            )
            logger.info(f"RAG Application initialized with model: {settings.openai_model}")
        except Exception as e:
            logger.error(f"Error initializing RAG application: {str(e)}")
            raise
        
        self.system_prompt = PromptTemplate(
            input_variables=["context", "question"],
            template="""You are an AI assistant helping users with information. 
                
Use the provided context to answer the user's question. If the context doesn't contain relevant information, provide a helpful response based on your knowledge.

Context:
{context}

Question: {question}

Answer:"""
        )
    
    async def process_query(self, query: str, context: str = "") -> str:
        """
        Process a user query with RAG
        
        Args:
            query: User's question
            context: Retrieved context from knowledge base (can be empty for general queries)
        
        Returns:
            Assistant's response
        """
        try:
            # 1️⃣ Check predefined profile Q&A first
            predefined_answer = self._match_profile_qa(query)
            if predefined_answer:
                logger.info("Answered using predefined profile Q&A")
                return predefined_answer

            # 2️⃣ Otherwise continue with RAG / LLM
            if context:
                prompt = self.system_prompt.format(
                    context=context,
                    question=query
                )
            else:
                prompt = query

            response = self.llm.invoke(prompt)
            logger.info(f"Query processed successfully: {query[:50]}...")
            return response.content
        
        except Exception as e:
            error_msg = f"Error processing query: {str(e)}"
            logger.error(error_msg)
            return error_msg
    
    async def retrieve_context(self, query: str) -> str:
        """
        Placeholder for retrieving context from knowledge base
        This can be enhanced with vector databases like Pinecone, Weaviate, etc.
        """
        # TODO: Implement actual context retrieval from your knowledge base
        return ""

    def _match_profile_qa(self, query: str) -> str | None:
        query_lower = query.lower()

        for qa in PROFILE_QA:
            for keyword in qa["keywords"]:
                if keyword in query_lower:
                    return qa["answer"]

        return None
