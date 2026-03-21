import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { ChatbotProvider } from "./context/ChatbotContext.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <ChatbotProvider>
          <App />
        </ChatbotProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)