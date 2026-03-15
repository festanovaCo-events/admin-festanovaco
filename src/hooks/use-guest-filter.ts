import { useMemo } from "react";
import { Guest } from "@/interfaces";

interface UseGuestFilterProps {
  guests: Guest[];
  searchQuery: string;
  statusFilter: "all" | "confirmed" | "pending";
}

export const useGuestFilter = ({
  guests,
  searchQuery,
  statusFilter,
}: UseGuestFilterProps) => {
  const filteredGuests = useMemo(() => {
    let filtered = guests;

    if (statusFilter === "confirmed") {
      filtered = filtered.filter((g) => g.confirmed);
    } else if (statusFilter === "pending") {
      filtered = filtered.filter((g) => !g.confirmed);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (guest) =>
          guest.name.toLowerCase().includes(query) ||
          guest.email.toLowerCase().includes(query) ||
          guest.phone?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [guests, searchQuery, statusFilter]);

  return { filteredGuests };
};

