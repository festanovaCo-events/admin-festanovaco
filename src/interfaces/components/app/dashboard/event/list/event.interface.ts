export interface Event {
  id: string;
  title: string;
  description: string;
  husbandName?: string;
  wifeName?: string;
  eventType: string;
  date: string;
  time: string;
  location: string;
  status?: string;
  capacity?: number;
  bannerPhoto?: string;
  createdAt: string;
  createdBy?: string;
  ceremonyDate?: string;
  ceremonyTime?: string;
  ceremonyLocation?: string;
  gallery?: string[];
  musicUrl?: string;
  footerPhoto?: string;
}

export type SortOption = "latest" | "oldest" | "title";
