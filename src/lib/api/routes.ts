export const API_ROUTES = {
  AUTH: {
    LOGIN: `/v1/auth/login`,
    REGISTER: `/v1/user/create`,
  },
  EVENT: {
    CREATE: `/v1/event/create`,
    LIST: `/v1/event`,
    GET_BY_ID: (eventId: string) => `/v1/event/${eventId}`,
    ASSETS: (eventId: string) => `/v1/event/${eventId}/assets`,
    CONFIG: (eventType: string, eventId: string) => `/v1/event-config/${eventType}/${eventId}`,
  },
} as const;
