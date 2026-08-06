import type { Guest } from "@/interfaces/components/app/dashboard/guest-list/interfaces";

export interface UseGuestFilterProps {
  guests: Guest[];
  searchQuery: string;
  statusFilter: "all" | "confirmed" | "pending" | "declined";
}
