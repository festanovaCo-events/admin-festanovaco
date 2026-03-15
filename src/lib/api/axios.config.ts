import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getAuthToken, removeAuthToken } from '@/lib/utils/cookies';
import { redirectToLogin } from '@/lib/utils/auth';

/**
 * Configuración de la instancia de axios
 * Incluye interceptores para manejo automático de tokens y errores
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * Interceptor de request: Inyecta el token de autenticación automáticamente
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor de response: Maneja errores de autenticación
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      removeAuthToken();
      
      if (typeof window !== 'undefined') {
        redirectToLogin();
      }
    }
    
    return Promise.reject(error);
  }
);
