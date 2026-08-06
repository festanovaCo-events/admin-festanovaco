import type { GuestList } from "@/interfaces/components/app/dashboard/guest-list/interfaces";
import { MOCK_GUESTS_BY_LIST_ID } from "./guests-detail.mock";
import { MOCK_GUEST_LIST_LISTING } from "./listing.mock";

/** Listas completas para la UI que espera `GuestList` con `guests`. */
export const MOCK_GUEST_LISTS: GuestList[] = MOCK_GUEST_LIST_LISTING.map(
  (row) => ({
    ...row,
    guests: MOCK_GUESTS_BY_LIST_ID[row.id] ?? [],
  }),
);
