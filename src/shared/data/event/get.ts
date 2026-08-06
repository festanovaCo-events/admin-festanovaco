import type {
  GetEventResponse,
  ListEventsResponse,
} from "@/interfaces/api/event/responses.interface";
import type { Event } from "@/interfaces/components/app/dashboard/event/list/event.interface";
import { apiClient } from "@/shared/lib/api/axios.config";
import { API_ROUTES } from "@/shared/lib/api/routes";
import { mapEventDataToEvent } from "./mapper";

/**
 * Servicio de eventos - Métodos GET.
 * Compartido por las features de `event` (list, detail) y `guest-list`.
 */

/**
 * Obtiene un evento por su ID.
 * @param id - ID del evento
 * @returns Evento encontrado o null si no existe
 * @throws Error si la petición falla
 */
export async function getEventById(id: string): Promise<Event | null> {
  const response = await apiClient.get<GetEventResponse>(
    API_ROUTES.EVENT.GET_BY_ID(id),
  );

  if (response.data.success && response.data.data) {
    return mapEventDataToEvent(response.data.data);
  }

  return null;
}

/**
 * Lista todos los eventos.
 * @returns Array de eventos mapeados al formato del frontend
 * @throws Error si la petición falla
 */
export async function listEvents(): Promise<Event[]> {
  const response = await apiClient.get<ListEventsResponse>(
    API_ROUTES.EVENT.LIST,
  );

  if (response.data.success && response.data.data) {
    return response.data.data.map(mapEventDataToEvent);
  }

  return [];
}
