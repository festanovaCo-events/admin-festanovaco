import type { GuestList } from "@/interfaces";
import { MOCK_GUEST_LIST_LISTING } from "./listing.mock";
import { MOCK_GUESTS_BY_LIST_ID } from "./guests-detail.mock";

export { MOCK_GUEST_LIST_LISTING, type GuestListListingMock } from "./listing.mock";
export { MOCK_GUESTS_BY_LIST_ID } from "./guests-detail.mock";
export { generateGuests } from "./generate-guests";

/** Listas completas para la UI que espera `GuestList` con `guests`. */
export const MOCK_GUEST_LISTS: GuestList[] = MOCK_GUEST_LIST_LISTING.map(
  (row) => ({
    ...row,
    guests: MOCK_GUESTS_BY_LIST_ID[row.id] ?? [],
  }),
);
