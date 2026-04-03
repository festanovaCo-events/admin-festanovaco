import { apiClient } from '@/lib/api';
import { API_ROUTES } from '@/lib/api/routes';
import type { DeleteEventResponse } from '@/interfaces';

/**
 * Servicio de eventos - Método DELETE
 * Elimina un evento por su ID
 * Solo contiene llamados al API
 */
export async function deleteEvent(eventId: string): Promise<DeleteEventResponse> {
  try {
    const response = await apiClient.delete<DeleteEventResponse>(
      API_ROUTES.EVENT.DELETE(eventId)
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

