"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { EVENT_TYPE_MAP, EVENT_TYPES } from "@/constants/event/event-types";
import type {
  Event,
  SortOption,
} from "@/interfaces/components/app/dashboard/event/list/event.interface";
import { deleteEvent } from "@/shared/data/event/delete";
import { listEvents } from "@/shared/data/event/get";
import { useAsyncRequest } from "@/shared/hooks/use-async-request";
import { useEventDateFormatter } from "@/shared/hooks/use-event-date-formatter";

export function useEventList() {
  const router = useRouter();
  const locale = useLocale();
  const tList = useTranslations("event.list");

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [events, setEvents] = useState<Event[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { isLoading, error, execute } = useAsyncRequest<Event[]>({
    showToast: false,
  });

  const { isLoading: isDeleting, execute: executeDelete } = useAsyncRequest({
    successMessage: tList("deleteSuccess"),
    errorMessage: tList("deleteFailed"),
    initialLoading: false,
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
        default: {
          const _exhaustive: never = sortBy;
          return _exhaustive;
        }
      }
    });

    return sorted;
  }, [events, searchQuery, sortBy]);

  useEffect(() => {
    execute(async () => {
      const events = await listEvents();
      setEvents(events);
      return events;
    });
  }, [execute]);

  const getConfigPath = (event: Event) => {
    const eventType =
      EVENT_TYPE_MAP[event.eventType.toLowerCase()] || EVENT_TYPES.WEDDING;
    return `/${locale}/dashboard/event/config/${eventType}/${event.id}`;
  };

  const onSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const onSortChange = (value: SortOption) => {
    setSortBy(value);
  };

  const onSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const onSearchBlur = () => {
    setIsSearchFocused(false);
  };

  const onView = (event: Event) => {
    router.push(`/${locale}/dashboard/event/${event.id}`);
  };

  const onConfig = (event: Event) => {
    router.push(getConfigPath(event));
  };

  const onConfigPrefetch = (event: Event) => {
    router.prefetch(getConfigPath(event));
  };

  const onUploadGuests = (event: Event) => {
    router.push(`/${locale}/dashboard/file-manager/${event.id}`);
  };

  const onViewGuests = (event: Event) => {
    router.push(`/${locale}/dashboard/guest-list/${event.id}`);
  };

  const onDelete = async (event: Event) => {
    const result = await executeDelete(() => deleteEvent(event.id));
    if (result === null) return;
    setEvents((prev) => prev.filter((e) => e.id !== event.id));
    router.refresh();
  };

  return {
    events,
    searchQuery,
    sortBy,
    isSearchFocused,
    filteredAndSortedEvents,
    formatEventDate,
    isLoading,
    error,
    isDeleting,
    onSearchChange,
    onSortChange,
    onSearchFocus,
    onSearchBlur,
    onView,
    onConfig,
    onConfigPrefetch,
    onUploadGuests,
    onViewGuests,
    onDelete,
  };
}

export type UseEventListReturn = ReturnType<typeof useEventList>;
