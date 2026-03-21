// API service for chatbot backend communication
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://0.0.0.1:8000';

console.log('Chatbot API URL:', API_BASE_URL);

export const chatbotApi = {
  /**
   * Send a message to the chatbot API
   * @param {string} message - User's message
   * @param {Array} conversationHistory - Previous conversation messages
   * @param {string} context - Optional context for RAG
   * @returns {Promise<{response: string, status: string}>}
   */
  async sendMessage(message, conversationHistory = [], context = '') {
    try {
      const url = `${API_BASE_URL}/chat`;
      console.log('Sending message to:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          conversation_history: conversationHistory,
          context,
        }),
      });

      if (!response.ok) {
        console.error('API Response Error:', response.status, response.statusText);
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      return data;
    } catch (error) {
      console.error('Error sending message to chatbot API:', error);
      throw error;
    }
  },

  /**
   * Check API health status
   * @returns {Promise<Object>}
   */
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      if (!response.ok) {
        throw new Error(`Health check failed: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error checking API health:', error);
      throw error;
    }
  },
};
