"use client";

import { useMemo, useState } from "react";
import { useEventDateFormatter } from "@/shared/hooks/use-event-date-formatter";
import { getGuestLists } from "../data/list";

export type SortOption = "latest" | "oldest" | "name";

export function useListState() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("latest");

  const formatListDate = useEventDateFormatter("short");
  const guestLists = useMemo(() => getGuestLists(), []);

  return {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    formatListDate,
    guestLists,
  };
}

export type ListState = ReturnType<typeof useListState>;
