export interface Event {
  id: string;
  title: string;
  description: string;
  eventType: string;
  date: string;
  time: string;
  location: string;
  status?: string;
  capacity?: number;
  bannerPhoto?: string;
  createdAt: string;
  ceremonyDate?: string;
  ceremonyTime?: string;
  ceremonyLocation?: string;
  gallery?: string[];
  musicUrl?: string;
  footerPhoto?: string;
}

export type SortOption = "latest" | "oldest" | "title";
