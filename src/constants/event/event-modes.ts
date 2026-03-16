export const EVENT_MODES = {
  ON_SITE: "on_site",
  ONLINE: "online",
  HYBRID: "hybrid",
} as const;

export type EventMode = typeof EVENT_MODES[keyof typeof EVENT_MODES];
  