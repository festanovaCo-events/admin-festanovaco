"use client";

import { useMemo, useState } from "react";
import type { Event, SortOption } from "@/interfaces/components/app/dashboard/event/list/event.interface";
import { useAsyncRequest } from "@/shared/hooks/use-async-request";
import { useEventDateFormatter } from "@/shared/hooks/use-event-date-formatter";

export function useListState() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [events, setEvents] = useState<Event[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { isLoading, error, execute } = useAsyncRequest<Event[]>({
    showToast: false,
  });

  const formatEventDate = useEventDateFormatter("short");

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((event) => {
        const info = event.additionalInformation;
        const description = info?.description ?? "";
        const location = info?.location ?? "";
        return (
          event.title.toLowerCase().includes(query) ||
          description.toLowerCase().includes(query) ||
          location.toLowerCase().includes(query)
        );
      });
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return sorted;
  }, [events, searchQuery, sortBy]);

  return {
    events,
    setEvents,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    isSearchFocused,
    setIsSearchFocused,
    filteredAndSortedEvents,
    formatEventDate,
    isLoading,
    error,
    execute,
  };
}

export type ListState = ReturnType<typeof useListState>;
