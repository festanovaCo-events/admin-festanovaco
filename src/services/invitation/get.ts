import { mapInvitationItemToGuest } from "@/adapters/invitation.adapter";
import { FEATURE_FLAGS, TIMEOUTS } from "@/constants";
import { MOCK_GUESTS_BY_LIST_ID } from "@/constants/mocks/guest-list";
import type {
  GetInvitationInfoResponse,
  InvitationInfoData,
  ListInvitationsResponse,
} from "@/interfaces";
import type { Guest } from "@/interfaces/components/app/dashboard/guest-list";
import { apiClient } from "@/lib/api";
import { API_ROUTES } from "@/lib/api/routes";

/**
 * Servicio de invitaciones - Métodos GET
 * Maneja la lectura de invitaciones por evento
 * Usa feature flags para decidir entre mocks y llamadas reales a la API
 */

/**
 * Obtiene las invitaciones de un evento y las mapea al modelo de 'Guest'
 * @param eventId - ID del evento
 * @returns Lista de invitados mapeados
 * @throws Error si la petición falla
 */
export async function getInvitationsByEvent(eventId: string): Promise<Guest[]> {
  if (FEATURE_FLAGS.USE_MOCK_LIST_INVITATIONS) {
    await new Promise((resolve) => setTimeout(resolve, TIMEOUTS.MOCK_DELAY));
    return MOCK_GUESTS_BY_LIST_ID[eventId] ?? [];
  }

  try {
    const response = await apiClient.get<ListInvitationsResponse>(
      API_ROUTES.INVITATION.LIST(eventId),
    );

    const items = response.data?.data ?? [];
    return items.map(mapInvitationItemToGuest);
  } catch (error) {
    throw error;
  }
}

/**
 * Obtiene el detalle de una invitación por token
 * @param token - Token de la invitación (extraído de invitation_url)
 * @returns Datos del detalle de la invitación
 * @throws Error si la petición falla
 */
export async function getInvitationInfoByToken(
  token: string,
): Promise<InvitationInfoData> {
  try {
    const response = await apiClient.get<GetInvitationInfoResponse>(
      API_ROUTES.INVITATION.INFO(token),
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
}
