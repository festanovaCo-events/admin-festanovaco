export interface Event {
  id: string;
  title: string;
  description: string;
  eventType: string;
  date: string;
  time: string;
  location: string;
  bannerPhoto?: string;
  createdAt: string;
}

export type SortOption = "latest" | "oldest" | "title";

export interface EventCardProps {
  event: Event;
}

