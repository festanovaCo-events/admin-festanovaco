"use client";

import { useListEffect } from "./effect/use-list-effect";
import { useListHandler } from "./handler/use-list-handler";
import { useListState } from "./state/use-list-state";

export function useEventList() {
  const state = useListState();

  const handler = useListHandler({
    setSearchQuery: state.setSearchQuery,
    setSortBy: state.setSortBy,
    setIsSearchFocused: state.setIsSearchFocused,
    setEvents: state.setEvents,
  });

  useListEffect({ execute: state.execute, setEvents: state.setEvents });

  return {
    events: state.events,
    searchQuery: state.searchQuery,
    sortBy: state.sortBy,
    isSearchFocused: state.isSearchFocused,
    filteredAndSortedEvents: state.filteredAndSortedEvents,
    formatEventDate: state.formatEventDate,
    isLoading: state.isLoading,
    error: state.error,
    isDeleting: handler.isDeleting,
    onSearchChange: handler.onSearchChange,
    onSortChange: handler.onSortChange,
    onSearchFocus: handler.onSearchFocus,
    onSearchBlur: handler.onSearchBlur,
    onView: handler.onView,
    onConfig: handler.onConfig,
    onConfigPrefetch: handler.onConfigPrefetch,
    onUploadGuests: handler.onUploadGuests,
    onViewGuests: handler.onViewGuests,
    onDelete: handler.onDelete,
  };
}

export type UseEventListReturn = ReturnType<typeof useEventList>;
