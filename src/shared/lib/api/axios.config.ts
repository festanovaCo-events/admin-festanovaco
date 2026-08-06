import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { TIMEOUTS } from "@/constants/time";
import { redirectToLogin } from "@/shared/lib/utils/auth";
import { getAuthToken, removeAuthToken } from "@/shared/lib/utils/cookies";
import { useAuthStore } from "@/shared/stores/auth/auth.store";
import { useStatusOverlayStore } from "@/shared/stores/status-overlay/status-overlay.store";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");

if (!API_BASE) {
  throw new Error(
    "Falta NEXT_PUBLIC_API_BASE_URL. Copia .env.local.example a .env y apunta a Mockoon (http://localhost:3000).",
  );
}

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
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
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      removeAuthToken();
      useAuthStore.getState().logout();

      if (typeof window !== "undefined") {
        redirectToLogin();
      }
    }

    if (typeof window !== "undefined") {
      const store = useStatusOverlayStore.getState();
      const status = error.response?.status;

      if (!error.response) {
        store.showStatus({
          type: "noInternet",
          details: error.message,
          onRetry: () => window.location.reload(),
        });
      } else if (status === 400) {
        store.showStatus({
          type: "badRequest",
          details: (error.response.data as any)?.message ?? error.message,
        });
      } else if (status === 403) {
        store.showStatus({
          type: "forbidden",
          details: (error.response.data as any)?.message ?? error.message,
        });
      } else if (status === 404) {
        store.showStatus({
          type: "notFound",
          details: (error.response.data as any)?.message ?? error.message,
        });
      } else if (status === 503) {
        store.showStatus({
          type: "maintenance",
          details: (error.response.data as any)?.message ?? error.message,
          onRetry: () => window.location.reload(),
        });
      } else if (status && status >= 500) {
        store.showStatus({
          type: "internalServerError",
          details: (error.response.data as any)?.message ?? error.message,
          onRetry: () => window.location.reload(),
        });
      }
    }

    return Promise.reject(error);
  },
);
