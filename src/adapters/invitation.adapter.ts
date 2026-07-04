import type { InvitationItemData } from "@/interfaces";
import type { Guest } from "@/interfaces/components/app/dashboard/guest-list";

function extractTokenFromUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  try {
    const u = new URL(url);
    const token = u.searchParams.get("token") || undefined;
    return token;
  } catch {
    return undefined;
  }
}

export function mapInvitationItemToGuest(item: InvitationItemData): Guest {
  return {
    id: item.id,
    name: item.name ?? "N/A",
    email: (item.email ?? "N/A") as string,
    phone: undefined,
    confirmed: item.status === "ACCEPTED",
    status: item.status,
    confirmedAt: undefined,
    numberOfSeats: item.total_seats ?? item.seats ?? 0,
    subGuests: undefined,
    invitationToken: extractTokenFromUrl(item.invitation_url || undefined),
    invitation_url: item.invitation_url,
  };
}
