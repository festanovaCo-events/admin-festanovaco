import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getAuthToken, removeAuthToken } from '@/lib/utils/cookies';
import { redirectToLogin } from '@/lib/utils/auth';
import { useAuthStore } from '@/stores/auth';
import { TIMEOUTS } from '@/constants';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: TIMEOUTS.AXIOS_DEFAULT,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    if (config.data instanceof FormData && config.headers) {
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      removeAuthToken();
      useAuthStore.getState().logout();
      
      if (typeof window !== 'undefined') {
        redirectToLogin();
      }
    }
    
    return Promise.reject(error);
  }
);
