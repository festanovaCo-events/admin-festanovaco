import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getAuthToken, removeAuthToken } from '@/lib/utils/cookies';
import { redirectToLogin } from '@/lib/utils/auth';
import { useAuthStore } from '@/stores/auth';
import { TIMEOUTS } from '@/constants';
import { useStatusOverlayStore } from '@/stores/status-overlay';

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

    if (typeof window !== 'undefined') {
      const store = useStatusOverlayStore.getState();
      const status = error.response?.status;
    
      if (!error.response) {
        store.showStatus({ type: 'noInternet', details: error.message, onRetry: () => window.location.reload() });
      } else if (status === 400) {
        store.showStatus({ type: 'badRequest', details: (error.response.data as any)?.message ?? error.message });
      } else if (status === 403) {
        store.showStatus({ type: 'forbidden', details: (error.response.data as any)?.message ?? error.message });
      } else if (status === 404) {
        store.showStatus({ type: 'notFound', details: (error.response.data as any)?.message ?? error.message });
      } else if (status === 503) {
        store.showStatus({ type: 'maintenance', details: (error.response.data as any)?.message ?? error.message, onRetry: () => window.location.reload() });
      } else if (status && status >= 500) {
        store.showStatus({ type: 'internalServerError', details: (error.response.data as any)?.message ?? error.message, onRetry: () => window.location.reload() });
      }
    }

    return Promise.reject(error);
  }
);
