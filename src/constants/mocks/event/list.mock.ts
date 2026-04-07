import type { Event } from "@/interfaces";

/**
 * Eventos para el listado del dashboard (tarjetas).
 * Campos alineados con {@link Event}; activos sin galería completa en assets.
 */
export const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Boda de María y Juan",
    address: "Salón de Eventos El Jardín, Calle Principal 123",
    eventType: "boda",
    date: "2026-12-17",
    time: "18:00",
    status: "published",
    capacity: 150,
    createdAt: "2026-12-01T15:00:00.000Z",
    createdBy: "María González",
    assets: {
      bannerPhoto:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
      gallery: [],
      footerPhoto:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
      musicUrl: "",
    },
    additionalInformation: null,
  },
  {
    id: "2",
    title: "Cumpleaños de Ana - 30 años",
    address: "Restaurante La Terraza, Avenida Central 456",
    eventType: "cumpleanos",
    date: "2026-12-20",
    time: "20:00",
    status: "published",
    capacity: 80,
    createdAt: "2026-11-25T12:00:00.000Z",
    createdBy: "Roberto Martínez",
    assets: {
      bannerPhoto:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
      gallery: [],
      footerPhoto:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
      musicUrl: "",
    },
    additionalInformation: null,
  },
  {
    id: "3",
    title: "Aniversario de Bodas - 25 años",
    address: "Hotel Grand Palace, Boulevard Norte 789",
    eventType: "aniversario",
    date: "2026-12-25",
    time: "19:00",
    status: "published",
    capacity: 200,
    createdAt: "2026-11-20T09:00:00.000Z",
    createdBy: "Carmen García",
    assets: {
      bannerPhoto:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      gallery: [],
      footerPhoto:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      musicUrl: "",
    },
    additionalInformation: null,
  },
];
