import { createContext, useState } from "react";

export const ChatbotContext = createContext();

export function ChatbotProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ChatbotContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ChatbotContext.Provider>
  );
}
