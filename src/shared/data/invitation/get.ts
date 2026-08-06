import type { InvitationInfoData } from "@/interfaces/api/invitation/data.interface";
import type {
  GetInvitationInfoResponse,
  ListInvitationsResponse,
} from "@/interfaces/api/invitation/responses.interface";
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

const SEATS_FETCH_CHUNK_SIZE = 10;

async function fetchGuestTotalSeats(guest: Guest): Promise<Guest> {
  if (!guest.invitationToken) return guest;
  if (guest.numberOfSeats > 0) return guest;

  try {
    const info = await getInvitationInfoByToken(guest.invitationToken);
    return { ...guest, numberOfSeats: info.total_seats };
  } catch {
    return guest;
  }
}

/**
 * Completa `numberOfSeats` consultando info de invitación cuando el listado no lo trae.
 */
export async function enrichGuestsWithTotalSeats(
  guests: Guest[],
): Promise<Guest[]> {
  const enriched: Guest[] = [];

  for (let i = 0; i < guests.length; i += SEATS_FETCH_CHUNK_SIZE) {
    const chunk = guests.slice(i, i + SEATS_FETCH_CHUNK_SIZE);
    const chunkResults = await Promise.all(chunk.map(fetchGuestTotalSeats));
    enriched.push(...chunkResults);
  }

  return enriched;
}
