import type { GuestList } from "@/interfaces/components/app/dashboard/guest-list/interfaces";

/** Metadatos de cada lista (grid de invitados); sin arreglo `guests`. */
export type GuestListListingMock = Omit<GuestList, "guests">;

/**
 * Listados de invitados mostrados en `/dashboard/guest-list`.
 * Los `id` coinciden con los eventos mock para navegación coherente.
 */
export const MOCK_GUEST_LIST_LISTING: GuestListListingMock[] = [
  {
    id: "1",
    name: "Boda de María y Juan",
    eventType: "boda",
    owner: "María González",
    ownerEmail: "maria@example.com",
    createdAt: "2026-12-01T15:00:00.000Z",
    totalGuests: 150,
    confirmedGuests: 120,
  },
  {
    id: "2",
    name: "Cumpleaños de Ana - 30 años",
    eventType: "cumpleanos",
    owner: "Roberto Martínez",
    ownerEmail: "roberto@example.com",
    createdAt: "2026-11-25T12:00:00.000Z",
    totalGuests: 80,
    confirmedGuests: 65,
  },
  {
    id: "3",
    name: "Aniversario de Bodas - 25 años",
    eventType: "aniversario",
    owner: "Carmen García",
    ownerEmail: "carmen@example.com",
    createdAt: "2026-11-20T09:00:00.000Z",
    totalGuests: 200,
    confirmedGuests: 180,
  },
];
