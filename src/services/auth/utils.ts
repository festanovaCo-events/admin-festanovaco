import { removeAuthToken } from '@/lib/utils/cookies';
import { redirectToLogin } from '@/lib/utils/auth';
import { useAuthStore } from '@/stores/auth';

/**
 * Servicio de autenticación - Utilidades
 * Funciones auxiliares que no son llamadas HTTP directas
 */

/**
 * Cierra la sesión del usuario
 * Elimina el token de autenticación, limpia el store y redirige al login
 * Usa la misma lógica del interceptor para respetar el locale y evitar loops
 */
export function logout(): void {
  removeAuthToken();
  useAuthStore.getState().logout();
  redirectToLogin(true);
}
