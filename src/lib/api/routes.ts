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
    CONFIG: (eventType: string, eventId: string) =>
      `/v1/event-config/${eventType}/${eventId}`,
    DELETE: (eventId: string) => `/v1/event/${eventId}`,
  },
  INVITATION: {
    UPLOAD: (eventId: string) => `/v1/invitation/${eventId}/upload`,
    LIST: (eventId: string) => `/v1/invitation/${eventId}`,
    INFO: (token: string) => `/v1/invitation/info/${token}`,
  },
  TELEMETRY: {
    TRACES: `/v1/traces`,
  },
} as const;
