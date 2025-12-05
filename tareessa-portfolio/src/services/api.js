import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const contactAPI = {
  sendMessage: async (formData) => {
    try {
      const response = await api.post('/api/contact', formData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error' };
    }
  },

  getMessages: async () => {
    const response = await api.get('/api/messages');
    return response.data;
  },

  getMessageCount: async () => {
    const response = await api.get('/api/messages/count');
    return response.data;
  }
};

export default api;