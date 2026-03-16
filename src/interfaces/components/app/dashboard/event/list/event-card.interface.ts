import type { Event } from './event.interface';

export interface EventCardProps {
  event: Event;
  formatDate: (date: string) => string;
  getEventTypeLabel: (type: string) => string;
}

