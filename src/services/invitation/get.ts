import { apiClient } from '@/lib/api';
import { API_ROUTES } from '@/lib/api/routes';
import type { GetInvitationInfoResponse, InvitationInfoData, ListInvitationsResponse } from '@/interfaces';
import { mapInvitationItemToGuest } from '@/adapters/invitation.adapter';
import type { Guest } from '@/interfaces/components/app/dashboard/guest-list';

/**
 * Servicio de invitaciones - Métodos GET
 * Maneja la lectura de invitaciones por evento
 * Solo contiene llamados al API
 */

/**
 * Obtiene las invitaciones de un evento y las mapea al modelo de 'Guest'
 * @param eventId - ID del evento
 * @returns Lista de invitados mapeados
 * @throws Error si la petición falla
 */
export async function getInvitationsByEvent(eventId: string): Promise<Guest[]> {
  try {
    const response = await apiClient.get<ListInvitationsResponse>(
      API_ROUTES.INVITATION.LIST(eventId)
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
export async function getInvitationInfoByToken(token: string): Promise<InvitationInfoData> {
  try {
    const response = await apiClient.get<GetInvitationInfoResponse>(
      API_ROUTES.INVITATION.INFO(token)
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
}
