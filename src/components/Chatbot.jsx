import { useState, useContext, useEffect } from "react";
import { ChatbotContext } from "../context/ChatbotContext";
import { LanguageContext } from "../context/LanguageContext";
import "../styles/Chatbot.css";

export default function Chatbot({ isFloating = false }) {
  const { t } = useContext(LanguageContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { isOpen, setIsOpen } = useContext(ChatbotContext);

  // Initialize messages when component mounts or language changes
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: "assistant", content: t("chatbot.hello") }]);
    }
  }, [t]);

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
        content: t("chatbot.error")
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t("chatbot.error") }
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
              <h2>{t("chatbot.title")}</h2>
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
              {loading && <div className="message assistant"><p>{t("chatbot.thinking")}</p></div>}
            </div>

            <form onSubmit={handleSendMessage} className="chatbot-form">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("chatbot.placeholder")}
                disabled={loading}
              />
              <button type="submit" disabled={loading}>
                {loading ? t("chatbot.sending") : t("chatbot.send")}
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
        <h2>{t("chatbot.title")}</h2>
      </div>
      
      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <p>{msg.content}</p>
          </div>
        ))}
        {loading && <div className="message assistant"><p>{t("chatbot.thinking")}</p></div>}
      </div>

      <form onSubmit={handleSendMessage} className="chatbot-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("chatbot.placeholder")}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? t("chatbot.sending") : t("chatbot.send")}
        </button>
      </form>
    </section>
  );
}
