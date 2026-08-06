"use client";

import { useMemo } from "react";
import { useListEffect } from "./effect/use-list-effect";
import { useListHandler } from "./handler/use-list-handler";
import { useListState } from "./state/use-list-state";

export function useGuestList() {
  const state = useListState();

  const handler = useListHandler({
    setSearchQuery: state.setSearchQuery,
    setSortBy: state.setSortBy,
  });

  useListEffect({
    setGuestLists: state.setGuestLists,
    setIsLoading: state.setIsLoading,
  });

  const filteredAndSortedLists = useMemo(() => {
    let filtered = state.guestLists;

    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (list) =>
          list.name.toLowerCase().includes(query) ||
          list.owner.toLowerCase().includes(query) ||
          list.ownerEmail.toLowerCase().includes(query),
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (state.sortBy) {
        case "latest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return sorted;
  }, [state.guestLists, state.searchQuery, state.sortBy]);

  return {
    searchQuery: state.searchQuery,
    onSearchChange: handler.onSearchChange,
    sortBy: state.sortBy,
    onSortChange: handler.onSortChange,
    onViewGuests: handler.onViewGuests,
    formatListDate: state.formatListDate,
    guestLists: filteredAndSortedLists,
    isLoading: state.isLoading,
  };
}

export type UseGuestListReturn = ReturnType<typeof useGuestList>;
