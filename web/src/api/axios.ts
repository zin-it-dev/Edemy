import { VITE_ENV } from '@/constants/env';
import axios from 'axios';

const instance = axios.create({
  baseURL: VITE_ENV.apiUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
