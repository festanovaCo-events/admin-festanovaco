import type { Guest } from "@/interfaces";
import { generateGuests } from "./generate-guests";

/**
 * Invitados por id de lista/evento (detalle). Rangos de ids no solapados.
 */
export const MOCK_GUESTS_BY_LIST_ID: Record<string, Guest[]> = {
  "1": generateGuests(150, 120, 1),
  "2": generateGuests(80, 65, 151),
  "3": generateGuests(200, 180, 231),
};
