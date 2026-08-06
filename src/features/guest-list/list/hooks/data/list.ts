import { MOCK_GUEST_LISTS } from "@/constants/mocks/guest-list/guest-lists.mock";
import type { GuestList } from "@/interfaces/components/app/dashboard/guest-list/interfaces";

/** No hay endpoint real todavía; devuelve las listas de invitados mockeadas. */
export function getGuestLists(): GuestList[] {
  return MOCK_GUEST_LISTS;
}
