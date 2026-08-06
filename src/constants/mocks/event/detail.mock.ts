import type { Event } from "@/interfaces/components/app/dashboard/event/list/event.interface";

/**
 * Detalle por id (misma forma que devuelve getEventById con mocks).
 * Incluye galería, música y metadatos de fiesta (pareja, cita, horario ISO).
 */
export const MOCK_EVENTS_DETAIL: Record<string, Event> = {
  "1": {
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
      gallery: [
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
      ],
      footerPhoto:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
      musicUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    additionalInformation: {
      description:
        "Una celebración especial para unir nuestras vidas en matrimonio. Esperamos compartir este momento único con todos nuestros seres queridos.",
      husbandName: "Juan Pérez",
      wifeName: "María González",
      location: "Salón de Eventos El Jardín, Calle Principal 123",
      startsAt: "2026-12-17T18:00:00.000Z",
      endsAt: "2026-12-18T04:00:00.000Z",
    },
  },
  "2": {
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
      gallery: [
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400",
      ],
      footerPhoto:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
      musicUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    additionalInformation: {
      description:
        "Celebración de cumpleaños número 30. Una noche llena de música, baile y diversión con todos nuestros amigos y familia.",
      husbandName: "",
      wifeName: "",
      location: "Restaurante La Terraza, Avenida Central 456",
      startsAt: "2026-12-20T20:00:00.000Z",
      endsAt: "2026-12-21T03:00:00.000Z",
    },
  },
  "3": {
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
      gallery: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
      ],
      footerPhoto:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      musicUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    additionalInformation: {
      description:
        "Celebrando 25 años de amor y compromiso. Una velada romántica para recordar todos los momentos especiales que hemos compartido.",
      husbandName: "Luis García",
      wifeName: "Carmen García",
      location: "Hotel Grand Palace, Boulevard Norte 789",
      startsAt: "2026-12-25T19:00:00.000Z",
      endsAt: "2026-12-26T02:00:00.000Z",
    },
  },
};
