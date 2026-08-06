import { FEATURE_FLAGS } from "@/constants/feature-flags";
import { TIMEOUTS } from "@/constants/time";
import { MOCK_EVENTS } from "@/constants/mocks/event/list.mock";
import { MOCK_EVENTS_DETAIL } from "@/constants/mocks/event/detail.mock";
import type { Event } from "@/interfaces/components/app/dashboard/event/list/event.interface";
import type { GetEventResponse, ListEventsResponse } from "@/interfaces/api/event/responses.interface";
import { apiClient } from "@/shared/lib/api/axios.config";
import { API_ROUTES } from "@/shared/lib/api/routes";
import { mapEventDataToEvent } from "./mapper";

/**
 * Servicio de eventos - Métodos GET.
 * Compartido por las features de `event` (list, detail) y `guest-list`.
 * Usa feature flags para decidir entre mocks y llamadas reales a la API.
 */

/**
 * Obtiene un evento por su ID.
 * @param id - ID del evento
 * @returns Evento encontrado o null si no existe
 * @throws Error si la petición falla
 */
export async function getEventById(id: string): Promise<Event | null> {
  if (FEATURE_FLAGS.USE_MOCK_GET_EVENT) {
    await new Promise((resolve) => setTimeout(resolve, TIMEOUTS.MOCK_DELAY));

    const mockEvent = MOCK_EVENTS_DETAIL[id];
    if (mockEvent) {
      return mockEvent as Event;
    }
    return null;
  }
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
  if (FEATURE_FLAGS.USE_MOCK_LIST_EVENTS) {
    await new Promise((resolve) => setTimeout(resolve, TIMEOUTS.MOCK_DELAY));

    return MOCK_EVENTS;
  }
  const response = await apiClient.get<ListEventsResponse>(
    API_ROUTES.EVENT.LIST,
  );

  if (response.data.success && response.data.data) {
    return response.data.data.map(mapEventDataToEvent);
  }

  return [];
}
