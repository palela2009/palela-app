import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.100:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const phoneService = {
  getAll: async () => {
    const response = await api.get('/phones');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/phones/${id}`);
    return response.data;
  },
};

export const laptopService = {
  getAll: async () => {
    const response = await api.get('/laptops');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/laptops/${id}`);
    return response.data;
  },
};

export default api;
