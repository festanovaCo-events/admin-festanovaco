import type { DeleteEventResponse } from "@/interfaces/api/event/responses.interface";
import { apiClient } from "@/shared/lib/api/axios.config";
import { API_ROUTES } from "@/shared/lib/api/routes";

/**
 * Servicio de eventos - Método DELETE.
 * Elimina un evento por su ID.
 * Solo contiene llamados al API.
 */
export async function deleteEvent(
  eventId: string,
): Promise<DeleteEventResponse> {
  const response = await apiClient.delete<DeleteEventResponse>(
    API_ROUTES.EVENT.DELETE(eventId),
  );

  return response.data;
}
