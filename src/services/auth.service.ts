import { apiClient } from '@/lib/api';
import { API_ROUTES } from '@/lib/api/routes';
import { setAuthToken, removeAuthToken } from '@/lib/utils/cookies';
import { redirectToLogin } from '@/lib/utils/auth';
import type {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  RegisterResponse,
} from '@/interfaces';

export type { LoginResponse, RegisterResponse };

/**
 * Servicio de autenticación
 * Maneja las operaciones de login y registro
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

    if (response.data.success && response.data.data.token) {
      setAuthToken(response.data.data.token);
    }

    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Convierte los datos del formulario de registro (firstName + lastName) 
 * al formato esperado por el API (name)
 * @param firstName - Nombre del usuario
 * @param lastName - Apellido del usuario
 * @returns Objeto con name combinado
 */
export function formatRegisterData(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): RegisterRequest {
  return {
    name: `${firstName} ${lastName}`.trim(),
    email,
    password,
  };
}

/**
 * Cierra la sesión del usuario
 * Elimina el token de autenticación y redirige al login
 * Usa la misma lógica del interceptor para respetar el locale y evitar loops
 */
export function logout(): void {
  removeAuthToken();
  redirectToLogin(true);
}
