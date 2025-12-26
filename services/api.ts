import axios from 'axios';
import { tokenStorage } from '../utils/tokenStorage';
import { Platform } from 'react-native';

const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000/api';
  }
  return 'http://localhost:3000/api';
};

const API_BASE_URL = getBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await tokenStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  register: async (name: string, email: string, password: string, phone?: string) => {
    const response = await api.post('/auth/register', { name, email, password, phone });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  verifyToken: async () => {
    const response = await api.get('/auth/verify');
    return response.data;
  },
  
  logout: async () => {
    await tokenStorage.removeToken();
  },
};

export const profileService = {
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },
  
  updateProfile: async (data: { firstName: string; lastName: string; email: string; phone: string }) => {
    const response = await api.put('/profile', data);
    return response.data;
  },
};

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
