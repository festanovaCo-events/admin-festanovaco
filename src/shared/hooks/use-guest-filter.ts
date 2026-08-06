import { useMemo } from "react";
import type { Guest } from "@/interfaces/components/app/dashboard/guest-list/interfaces";
import type { InvitationStatus } from "@/interfaces/api/common/global.interface";
import type { UseGuestFilterProps } from "@/interfaces/hooks/use-guest-filter.interface";

export const useGuestFilter = ({
  guests,
  searchQuery,
  statusFilter,
}: UseGuestFilterProps) => {
  const filteredGuests = useMemo(() => {
    let filtered = guests;

    const getDerivedStatus = (g: Guest): InvitationStatus =>
      g.status === "ACCEPTED" ||
      g.status === "DECLINED" ||
      g.status === "PENDING"
        ? g.status
        : g.confirmed
          ? "ACCEPTED"
          : "PENDING";

    const predicateMap: Record<
      UseGuestFilterProps["statusFilter"],
      (g: Guest) => boolean
    > = {
      all: () => true,
      confirmed: (g) => getDerivedStatus(g) === "ACCEPTED",
      pending: (g) => getDerivedStatus(g) === "PENDING",
      declined: (g) => getDerivedStatus(g) === "DECLINED",
    };

    filtered = filtered.filter(predicateMap[statusFilter]);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (guest) =>
          guest.name.toLowerCase().includes(query) ||
          guest.email.toLowerCase().includes(query) ||
          guest.phone?.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [guests, searchQuery, statusFilter]);

  return { filteredGuests };
};
