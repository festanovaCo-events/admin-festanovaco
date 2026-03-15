import Cookies from 'js-cookie';

/**
 * Constantes para el manejo de cookies de autenticación
 */
const AUTH_TOKEN_KEY = 'auth_token';
const COOKIE_OPTIONS = {
  expires: 7, // 7 días
  sameSite: 'strict' as const,
  secure: process.env.NODE_ENV === 'production',
};

/**
 * Guarda el token de autenticación en una cookie
 * @param token - Token JWT a guardar
 */
export function setAuthToken(token: string): void {
  Cookies.set(AUTH_TOKEN_KEY, token, COOKIE_OPTIONS);
}

/**
 * Obtiene el token de autenticación de la cookie
 * @returns Token JWT o undefined si no existe
 */
export function getAuthToken(): string | undefined {
  return Cookies.get(AUTH_TOKEN_KEY);
}

/**
 * Elimina el token de autenticación de la cookie
 */
export function removeAuthToken(): void {
  Cookies.remove(AUTH_TOKEN_KEY);
}
