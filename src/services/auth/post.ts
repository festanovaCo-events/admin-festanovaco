import { apiClient } from '@/lib/api';
import { API_ROUTES } from '@/lib/api/routes';
import { setAuthToken } from '@/lib/utils/cookies';
import { useAuthStore } from '@/stores/auth';
import type {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  RegisterResponse,
} from '@/interfaces';

/**
 * Servicio de autenticación - Métodos POST
 * Maneja las operaciones de login y registro
 * Solo contiene llamados al API
 */

/**
 * Realiza el login del usuario
 * @param data - Credenciales de login (email y password)
 * @returns Respuesta del API con datos del usuario y token
 * @throws Error si la petición falla
 */
export async function login(
  data: LoginRequest
): Promise<LoginResponse> {
  try {
    const response = await apiClient.post<LoginResponse>(
      API_ROUTES.AUTH.LOGIN,
      data
    );

    if (response.data.success && response.data.data.token) {
      setAuthToken(response.data.data.token);
      useAuthStore.getState().setUser(response.data.data);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Registra un nuevo usuario
 * @param data - Datos de registro (name, email, password)
 * @returns Respuesta del API con datos del usuario y token
 * @throws Error si la petición falla
 */
export async function register(
  data: RegisterRequest
): Promise<RegisterResponse> {
  try {
    const response = await apiClient.post<RegisterResponse>(
      API_ROUTES.AUTH.REGISTER,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
