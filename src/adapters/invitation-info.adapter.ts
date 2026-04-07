import type { InvitationInfoData } from '@/interfaces';
import type { SubGuest } from '@/interfaces/components/app/dashboard/guest-list';

export function mapInvitationInfoToAugment(info: InvitationInfoData) {
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
