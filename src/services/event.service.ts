import { Event } from "@/interfaces";
import { MOCK_EVENTS } from "@/constants";

/**
 * Servicio para operaciones relacionadas con eventos
 * Implementa el principio de Single Responsibility y Dependency Inversion
 */

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
