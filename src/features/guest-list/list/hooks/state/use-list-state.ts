"use client";

import { useState } from "react";
import type { GuestList } from "@/interfaces/components/app/dashboard/guest-list/interfaces";
import { useEventDateFormatter } from "@/shared/hooks/use-event-date-formatter";

export type SortOption = "latest" | "oldest" | "name";

export function useListState() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [guestLists, setGuestLists] = useState<GuestList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const formatListDate = useEventDateFormatter("short");

  return {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    formatListDate,
    guestLists,
    setGuestLists,
    isLoading,
    setIsLoading,
  };
}

export type ListState = ReturnType<typeof useListState>;
