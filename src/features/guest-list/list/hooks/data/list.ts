import type { GuestList } from "@/interfaces/components/app/dashboard/guest-list/interfaces";
import { listEvents } from "@/shared/data/event/get";
import { getInvitationsByEvent } from "@/shared/data/invitation/get";

/**
 * Lista de invitados del dashboard: eventos + invitaciones vía API (Mockoon en local).
 */
export async function getGuestLists(): Promise<GuestList[]> {
  const events = await listEvents();

  return Promise.all(
    events.map(async (event) => {
      const guests = await getInvitationsByEvent(event.id);
      return {
        id: event.id,
        name: event.title,
        eventType: event.eventType,
        owner: event.createdBy,
        ownerEmail: "",
        createdAt: event.createdAt,
        totalGuests: guests.length,
        confirmedGuests: guests.filter((guest) => guest.confirmed).length,
        guests,
      };
    }),
  );
}
