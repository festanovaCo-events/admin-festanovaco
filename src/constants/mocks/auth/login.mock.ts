import type { LoginResponse } from "@/interfaces/api/auth/responses.interface";

/**
 * Respuesta mock de POST /v1/auth/login (misma forma que {@link LoginResponse}).
 */
export const MOCK_LOGIN_RESPONSE: LoginResponse = {
  success: true,
  data: {
    id: "user-mock-1",
    name: "Usuario Demo",
    email: "demo@ejemplo.com",
    isActive: true,
    password: "",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    deletedAt: "",
    token: "mock-jwt-token",
    accounts: [
      {
        id: "account-mock-1",
        owner: null,
        ownerId: "user-mock-1",
        isActive: true,
        members: [],
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
        deletedAt: "",
      },
    ],
  },
};
