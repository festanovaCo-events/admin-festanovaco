import type { Guest } from "@/interfaces";

export interface UseGuestFilterProps {
  guests: Guest[];
  searchQuery: string;
  statusFilter: "all" | "confirmed" | "pending" | "declined";
}
