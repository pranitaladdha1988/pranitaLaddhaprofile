import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "./theme/ThemeContext.jsx";
import { ChatbotProvider } from "./context/ChatbotContext.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ChatbotProvider>
          <App />
        </ChatbotProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)