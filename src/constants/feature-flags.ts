/**
 * Feature Flags
 * Controla qué funcionalidades usan mocks o llamadas reales a la API
 */

export const FEATURE_FLAGS = {
  /**
   * Si está en true, usa mocks para listar eventos
   * Si está en false, hace llamada real a la API
   */
  USE_MOCK_LIST_EVENTS: process.env.NEXT_PUBLIC_USE_MOCK_LIST_EVENTS === "true",

  /**
   * Si está en true, usa mocks para obtener un evento específico
   * Si está en false, hace llamada real a la API
   */
  USE_MOCK_GET_EVENT: process.env.NEXT_PUBLIC_USE_MOCK_GET_EVENT === "true",

  /**
   * Si está en true, usa mocks para listar invitados por evento (detalle de lista)
   * Si está en false, hace llamada real a la API
   */
  USE_MOCK_LIST_INVITATIONS:
    process.env.NEXT_PUBLIC_USE_MOCK_LIST_INVITATIONS === "true",

  /**
   * Si está en true, el login no llama al API y usa datos mock (útil sin backend)
   */
  USE_MOCK_LOGIN: process.env.NEXT_PUBLIC_USE_MOCK_LOGIN === "true",
} as const;
