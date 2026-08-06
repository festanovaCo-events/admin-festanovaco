import { FEATURE_FLAGS } from "@/constants/feature-flags";
import { TIMEOUTS } from "@/constants/time";
import { MOCK_GUESTS_BY_LIST_ID } from "@/constants/mocks/guest-list/guests-detail.mock";
import type { GetInvitationInfoResponse, ListInvitationsResponse } from "@/interfaces/api/invitation/responses.interface";
import type { InvitationInfoData } from "@/interfaces/api/invitation/data.interface";
import type { Guest } from "@/interfaces/components/app/dashboard/guest-list/interfaces";
import { mapInvitationItemToGuest } from "@/shared/data/invitation/invitation.adapter";
import { apiClient } from "@/shared/lib/api/axios.config";
import { API_ROUTES } from "@/shared/lib/api/routes";

/**
 * Obtiene las invitaciones de un evento y las mapea al modelo de 'Guest'.
 * Compartido por la feature de guest-list y file-manager.
 * @param eventId - ID del evento
 * @returns Lista de invitados mapeados
 * @throws Error si la petición falla
 */
export async function getInvitationsByEvent(eventId: string): Promise<Guest[]> {
  if (FEATURE_FLAGS.USE_MOCK_LIST_INVITATIONS) {
    await new Promise((resolve) => setTimeout(resolve, TIMEOUTS.MOCK_DELAY));
    return MOCK_GUESTS_BY_LIST_ID[eventId] ?? [];
  }
  const response = await apiClient.get<ListInvitationsResponse>(
    API_ROUTES.INVITATION.LIST(eventId),
  );

  const items = response.data?.data ?? [];
  return items.map(mapInvitationItemToGuest);
}

/**
 * Obtiene el detalle de una invitación por token.
 * @param token - Token de la invitación (extraído de invitation_url)
 * @returns Datos del detalle de la invitación
 * @throws Error si la petición falla
 */
export async function getInvitationInfoByToken(
  token: string,
): Promise<InvitationInfoData> {
  const response = await apiClient.get<GetInvitationInfoResponse>(
    API_ROUTES.INVITATION.INFO(token),
  );
  return response.data.data;
}
