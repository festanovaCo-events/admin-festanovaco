import { Event } from "@/interfaces";

/**
 * Servicio para operaciones relacionadas con eventos
 * Implementa el principio de Single Responsibility y Dependency Inversion
 */

// Datos mock - Reemplazar con llamada a API
const MOCK_EVENTS: Event[] = [
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

/**
 * Obtiene todos los eventos
 * @returns Array de eventos
 */
export function getAllEvents(): Event[] {
  return MOCK_EVENTS;
}

/**
 * Obtiene un evento por su ID
 * @param id - ID del evento
 * @returns Evento encontrado o null
 */
export function getEventById(id: string): Event | null {
  return MOCK_EVENTS.find((event) => event.id === id) || null;
}
