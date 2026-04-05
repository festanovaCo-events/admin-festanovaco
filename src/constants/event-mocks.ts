import { Event } from "@/interfaces";

/**
 * Datos mock de eventos - Reemplazar con llamada a API
 * Estos datos se usan para desarrollo y pruebas
 */

export const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Boda de María y Juan",
    eventType: "boda",
    date: "2025-12-17",
    time: "18:00",
    createdAt: "2025-12-01",
    assets: {
      bannerPhoto:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
    },
    additionalInformation: {
      description:
        "Una celebración especial para unir nuestras vidas en matrimonio. Esperamos compartir este momento único con todos nuestros seres queridos.",
      location: "Salón de Eventos El Jardín, Calle Principal 123",
    },
  },
  {
    id: "2",
    title: "Cumpleaños de Ana - 30 años",
    eventType: "cumpleanos",
    date: "2025-12-20",
    time: "20:00",
    createdAt: "2025-11-25",
    assets: {
      bannerPhoto:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
    },
    additionalInformation: {
      description:
        "Celebración de cumpleaños número 30. Una noche llena de música, baile y diversión con todos nuestros amigos y familia.",
      location: "Restaurante La Terraza, Avenida Central 456",
    },
  },
  {
    id: "3",
    title: "Aniversario de Bodas - 25 años",
    eventType: "aniversario",
    date: "2025-12-25",
    time: "19:00",
    createdAt: "2025-11-20",
    assets: {
      bannerPhoto:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    },
    additionalInformation: {
      description:
        "Celebrando 25 años de amor y compromiso. Una velada romántica para recordar todos los momentos especiales que hemos compartido.",
      location: "Hotel Grand Palace, Boulevard Norte 789",
    },
  },
];

export const MOCK_EVENTS_DETAIL: Record<string, Event> = {
  "1": {
    id: "1",
    title: "Boda de María y Juan",
    eventType: "boda",
    date: "2025-12-17",
    time: "18:00",
    ceremonyDate: "2025-12-17",
    ceremonyTime: "16:00",
    ceremonyLocation: "Iglesia San Francisco, Avenida Central 456",
    createdAt: "2025-12-01",
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
      musicUrl: "https://www.youtube.com/watch?v=example",
    },
    additionalInformation: {
      description:
        "Una celebración especial para unir nuestras vidas en matrimonio. Esperamos compartir este momento único con todos nuestros seres queridos. Este será un día lleno de amor, alegría y momentos inolvidables que recordaremos por siempre.",
      location: "Salón de Eventos El Jardín, Calle Principal 123",
    },
  },
  "2": {
    id: "2",
    title: "Cumpleaños de Ana - 30 años",
    eventType: "cumpleanos",
    date: "2025-12-20",
    time: "20:00",
    createdAt: "2025-11-25",
    assets: {
      bannerPhoto:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400",
      ],
      footerPhoto:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
      musicUrl: "https://www.youtube.com/watch?v=example2",
    },
    additionalInformation: {
      description:
        "Celebración de cumpleaños número 30. Una noche llena de música, baile y diversión con todos nuestros amigos y familia.",
      location: "Restaurante La Terraza, Avenida Central 456",
    },
  },
  "3": {
    id: "3",
    title: "Aniversario de Bodas - 25 años",
    eventType: "aniversario",
    date: "2025-12-25",
    time: "19:00",
    createdAt: "2025-11-20",
    assets: {
      bannerPhoto:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
      ],
      footerPhoto:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      musicUrl: "https://www.youtube.com/watch?v=example3",
    },
    additionalInformation: {
      description:
        "Celebrando 25 años de amor y compromiso. Una velada romántica para recordar todos los momentos especiales que hemos compartido.",
      location: "Hotel Grand Palace, Boulevard Norte 789",
    },
  },
};
