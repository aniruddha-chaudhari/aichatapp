import { MessageInterface } from '@/app/[tabs]/ChatRoom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://192.168.137.1:8000/chat'; // Replace with your actual local IP

async function getChatBotResponse(message: MessageInterface[]): Promise<MessageInterface> {
  try {
    const response = await axios.post(`${API_URL}/chat`, {
      input: { messages: message }
    }, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.data || !response.data.output) {
      throw new Error('Invalid response format');
    }

    return response.data.output;
  } catch (error: any) {
    console.error('ChatBot Error:', error.message);
    let errorMessage = 'Sorry, I encountered an error. Please try again later.';
    
    if (error.code === 'ECONNABORTED') {
      errorMessage = 'Request timed out. Please check your connection.';
    } else if (error.message.includes('Network Error')) {
      errorMessage = 'Unable to connect to the server. Please check if the server is running.';
    }

    return {
      role: 'assistant',
      content: errorMessage
    };
  }
}

export { getChatBotResponse };