import type { InvitationInfoData } from "@/interfaces/api/invitation/data.interface";
import type { InvitationDetailAugment, SubGuest } from "@/interfaces/components/app/dashboard/guest-list/interfaces";

export function mapInvitationInfoToAugment(
  info: InvitationInfoData,
): InvitationDetailAugment {
  const confirmedAt = info.invitation.responded_at || undefined;
  const numberOfSeats = info.invitation.seats_reserved;
  const availableSeats = info.available_seats;
  const usedSeats = info.used_seats;

  const subGuests: SubGuest[] = Array.isArray(info.invitation.guests)
    ? info.invitation.guests.map((g) => ({
        id: g.id,
        name: g.name,
      }))
    : [];

  return {
    confirmedAt,
    numberOfSeats,
    availableSeats,
    subGuests,
    totalSeats: info.total_seats,
    usedSeats,
  };
}
