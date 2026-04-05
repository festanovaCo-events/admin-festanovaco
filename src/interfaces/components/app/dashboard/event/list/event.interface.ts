/** Recursos visuales y de audio derivados de los assets del evento en API */
export interface EventAssets {
  bannerPhoto: string;
  gallery: string[];
  footerPhoto: string;
  musicUrl: string;
}

/** Metadatos de configuración (cita, nombres, lugar de fiesta, horarios) */
export interface EventAdditionalInformation {
  description: string;
  husbandName: string;
  wifeName: string;
  location: string;
  startsAt: string;
  endsAt: string;
}

export interface Event {
  id: string;
  title: string;
  address: string;
  eventType: string;
  date: string;
  time: string;
  status: string;
  capacity: number;
  createdAt: string;
  createdBy: string;
  assets: EventAssets | null;
  additionalInformation: EventAdditionalInformation | null;
}

export type SortOption = "latest" | "oldest" | "title";
