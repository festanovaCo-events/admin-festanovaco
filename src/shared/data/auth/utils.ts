import { redirectToLogin } from "@/shared/lib/utils/auth";
import { removeAuthToken } from "@/shared/lib/utils/cookies";
import { useAuthStore } from "@/shared/stores/auth/auth.store";

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
