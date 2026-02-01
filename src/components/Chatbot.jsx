import { useState, useContext } from "react";
import { ChatbotContext } from "../context/ChatbotContext";
import "../styles/Chatbot.css";

export default function Chatbot({ isFloating = false }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm an AI chatbot. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { isOpen, setIsOpen } = useContext(ChatbotContext);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Replace this with your AI API call
      // Example: const response = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message: input }) });
      
      // For now, using a placeholder response
      const assistantMessage = {
        role: "assistant",
        content: "I'm a placeholder response. Connect me to an AI API to provide real responses!"
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (isFloating) {
    return (
      <div className="floating-chatbot">
        {isOpen ? (
          <div className="chatbot-container floating-open">
            <div className="chatbot-header">
              <h2>AI Assistant</h2>
              <button 
                className="close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
            
            <div className="chatbot-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.role}`}>
                  <p>{msg.content}</p>
                </div>
              ))}
              {loading && <div className="message assistant"><p>Thinking...</p></div>}
            </div>

            <form onSubmit={handleSendMessage} className="chatbot-form">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={loading}
              />
              <button type="submit" disabled={loading}>
                {loading ? "..." : "Send"}
              </button>
            </form>
          </div>
        ) : (
          <button 
            className="chatbot-toggle"
            onClick={() => setIsOpen(true)}
            aria-label="Open chat"
          >
            💬
          </button>
        )}
      </div>
    );
  }

  return (
    <section className="chatbot-container">
      <div className="chatbot-header">
        <h2>AI Chat Assistant</h2>
      </div>
      
      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <p>{msg.content}</p>
          </div>
        ))}
        {loading && <div className="message assistant"><p>Thinking...</p></div>}
      </div>

      <form onSubmit={handleSendMessage} className="chatbot-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </section>
  );
}
