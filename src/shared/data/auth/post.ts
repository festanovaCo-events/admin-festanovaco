import { FEATURE_FLAGS } from "@/constants/feature-flags";
import { TIMEOUTS } from "@/constants/time";
import { MOCK_LOGIN_RESPONSE } from "@/constants/mocks/auth/login.mock";
import type { LoginRequest, RegisterRequest } from "@/interfaces/api/auth/requests.interface";
import type { LoginResponse, RegisterResponse } from "@/interfaces/api/auth/responses.interface";
import { apiClient } from "@/shared/lib/api/axios.config";
import { API_ROUTES } from "@/shared/lib/api/routes";
import { setAuthToken } from "@/shared/lib/utils/cookies";
import { useAuthStore } from "@/shared/stores/auth/auth.store";

/**
 * Servicio de autenticación - Métodos POST
 * Maneja las operaciones de login y registro.
 * El login puede usar mock si {@link FEATURE_FLAGS.USE_MOCK_LOGIN} está activo.
 */

/**
 * Realiza el login del usuario
 * @param data - Credenciales de login (email y password)
 * @returns Respuesta del API con datos del usuario y token
 * @throws Error si la petición falla
 */
export async function login(data: LoginRequest): Promise<LoginResponse> {
  if (FEATURE_FLAGS.USE_MOCK_LOGIN) {
    await new Promise((resolve) => setTimeout(resolve, TIMEOUTS.MOCK_DELAY));

    const payload: LoginResponse = {
      ...MOCK_LOGIN_RESPONSE,
      data: {
        ...MOCK_LOGIN_RESPONSE.data,
        email: data.email.trim() || MOCK_LOGIN_RESPONSE.data.email,
      },
    };

    if (payload.success && payload.data.token) {
      setAuthToken(payload.data.token);
      useAuthStore.getState().setUser(payload.data);
    }

    return payload;
  }

  const response = await apiClient.post<LoginResponse>(
    API_ROUTES.AUTH.LOGIN,
    data,
  );

  if (response.data.success && response.data.data.token) {
    setAuthToken(response.data.data.token);
    useAuthStore.getState().setUser(response.data.data);
  }

  return response.data;
}

/**
 * Registra un nuevo usuario
 * @param data - Datos de registro (name, email, password)
 * @returns Respuesta del API con datos del usuario y token
 * @throws Error si la petición falla
 */
export async function register(
  data: RegisterRequest,
): Promise<RegisterResponse> {
  const response = await apiClient.post<RegisterResponse>(
    API_ROUTES.AUTH.REGISTER,
    data,
  );
  return response.data;
}
