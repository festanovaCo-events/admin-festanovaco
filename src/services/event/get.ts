import { apiClient } from '@/lib/api';
import { API_ROUTES } from '@/lib/api/routes';
import { mapEventDataToEvent } from '@/adapters/event.adapter';
import { FEATURE_FLAGS, TIMEOUTS } from '@/constants';
import { MOCK_EVENTS, MOCK_EVENTS_DETAIL } from '@/constants/event-mocks';
import type {
  ListEventsResponse,
  GetEventResponse,
  Event,
} from '@/interfaces';

/**
 * Servicio de eventos - Métodos GET
 * Maneja las operaciones de lectura de eventos
 * Usa feature flags para decidir entre mocks y llamadas reales a la API
 */

/**
 * Obtiene un evento por su ID
 * @param id - ID del evento
 * @returns Evento encontrado o null si no existe
 * @throws Error si la petición falla
 */
export async function getEventById(id: string): Promise<Event | null> {
  // Si el feature flag está activo, usar mocks
  if (FEATURE_FLAGS.USE_MOCK_GET_EVENT) {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, TIMEOUTS.MOCK_DELAY));
    
    const mockEvent = MOCK_EVENTS_DETAIL[id];
    if (mockEvent) {
      return mockEvent as Event;
    }
    return null;
  }

  // Llamada real a la API
  try {
    const response = await apiClient.get<GetEventResponse>(
      API_ROUTES.EVENT.GET_BY_ID(id)
    );

    if (response.data.success && response.data.data) {
      return mapEventDataToEvent(response.data.data);
    }

    return null;
  } catch (error) {
    throw error;
  }
}

/**
 * Lista todos los eventos
 * @returns Array de eventos mapeados al formato del frontend
 * @throws Error si la petición falla
 */
export async function listEvents(): Promise<Event[]> {
  // Si el feature flag está activo, usar mocks
  if (FEATURE_FLAGS.USE_MOCK_LIST_EVENTS) {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, TIMEOUTS.MOCK_DELAY));
    
    return MOCK_EVENTS;
  }

  // Llamada real a la API
  try {
    const response = await apiClient.get<ListEventsResponse>(
      API_ROUTES.EVENT.LIST
    );

    if (response.data.success && response.data.data) {
      return response.data.data.map(mapEventDataToEvent);
    }

    return [];
  } catch (error) {
    throw error;
  }
}
