import { Event } from "@/interfaces";

/**
 * Datos mock de eventos - Reemplazar con llamada a API
 * Estos datos se usan para desarrollo y pruebas
 */

// Mock de eventos básicos (para lista)
export const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Boda de María y Juan",
    description:
      "Una celebración especial para unir nuestras vidas en matrimonio. Esperamos compartir este momento único con todos nuestros seres queridos.",
    eventType: "boda",
    date: "2025-12-17",
    time: "18:00",
    location: "Salón de Eventos El Jardín, Calle Principal 123",
    bannerPhoto:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
    createdAt: "2025-12-01",
  },
  {
    id: "2",
    title: "Cumpleaños de Ana - 30 años",
    description:
      "Celebración de cumpleaños número 30. Una noche llena de música, baile y diversión con todos nuestros amigos y familia.",
    eventType: "cumpleanos",
    date: "2025-12-20",
    time: "20:00",
    location: "Restaurante La Terraza, Avenida Central 456",
    bannerPhoto:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
    createdAt: "2025-11-25",
  },
  {
    id: "3",
    title: "Aniversario de Bodas - 25 años",
    description:
      "Celebrando 25 años de amor y compromiso. Una velada romántica para recordar todos los momentos especiales que hemos compartido.",
    eventType: "aniversario",
    date: "2025-12-25",
    time: "19:00",
    location: "Hotel Grand Palace, Boulevard Norte 789",
    bannerPhoto:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    createdAt: "2025-11-20",
  },
];

// Mock de eventos con detalles completos (para página de detalle)
export const MOCK_EVENTS_DETAIL: Record<string, any> = {
  "1": {
    id: "1",
    title: "Boda de María y Juan",
    description:
      "Una celebración especial para unir nuestras vidas en matrimonio. Esperamos compartir este momento único con todos nuestros seres queridos. Este será un día lleno de amor, alegría y momentos inolvidables que recordaremos por siempre.",
    eventType: "boda",
    date: "2025-12-17",
    time: "18:00",
    location: "Salón de Eventos El Jardín, Calle Principal 123",
    ceremonyDate: "2025-12-17",
    ceremonyTime: "16:00",
    ceremonyLocation: "Iglesia San Francisco, Avenida Central 456",
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
    createdAt: "2025-12-01",
  },
  "2": {
    id: "2",
    title: "Cumpleaños de Ana - 30 años",
    description:
      "Celebración de cumpleaños número 30. Una noche llena de música, baile y diversión con todos nuestros amigos y familia.",
    eventType: "cumpleanos",
    date: "2025-12-20",
    time: "20:00",
    location: "Restaurante La Terraza, Avenida Central 456",
    bannerPhoto:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400",
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400",
    ],
    footerPhoto:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
    musicUrl: "https://www.youtube.com/watch?v=example2",
    createdAt: "2025-11-25",
  },
  "3": {
    id: "3",
    title: "Aniversario de Bodas - 25 años",
    description:
      "Celebrando 25 años de amor y compromiso. Una velada romántica para recordar todos los momentos especiales que hemos compartido.",
    eventType: "aniversario",
    date: "2025-12-25",
    time: "19:00",
    location: "Hotel Grand Palace, Boulevard Norte 789",
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
    createdAt: "2025-11-20",
  },
};
