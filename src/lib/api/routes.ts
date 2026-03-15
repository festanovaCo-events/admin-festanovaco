/**
 * Centralización de todas las rutas de la API
 * Facilita el mantenimiento y evita errores de tipeo en las URLs
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${API_BASE}/v1/auth/login`,
    REGISTER: `${API_BASE}/v1/user/create`,
  },
} as const;
