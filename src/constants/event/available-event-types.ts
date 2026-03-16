import { EVENT_TYPES } from "./event-types";

export const AVAILABLE_EVENT_TYPES = [
  EVENT_TYPES.WEDDING,
] as const;

export const isEventTypeAvailable = (eventType: string): boolean => {
  return AVAILABLE_EVENT_TYPES.includes(eventType as any);
};
