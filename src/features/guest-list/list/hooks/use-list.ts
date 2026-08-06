"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import type { GuestList } from "@/interfaces/components/app/dashboard/guest-list/interfaces";
import { useEventDateFormatter } from "@/shared/hooks/use-event-date-formatter";
import { getGuestLists } from "./data/list";

export type SortOption = "latest" | "oldest" | "name";

export function useGuestList() {
  const router = useRouter();
  const locale = useLocale();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [guestLists, setGuestLists] = useState<GuestList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const formatListDate = useEventDateFormatter("short");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      try {
        const lists = await getGuestLists();
        if (!cancelled) {
          setGuestLists(lists);
        }
      } catch {
        if (!cancelled) {
          setGuestLists([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredAndSortedLists = useMemo(() => {
    let filtered = guestLists;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (list) =>
          list.name.toLowerCase().includes(query) ||
          list.owner.toLowerCase().includes(query) ||
          list.ownerEmail.toLowerCase().includes(query),
      );
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
        case "name":
          return a.name.localeCompare(b.name);
        default: {
          const _exhaustive: never = sortBy;
          return _exhaustive;
        }
      }
    });

    return sorted;
  }, [guestLists, searchQuery, sortBy]);

  const onSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const onSortChange = (value: SortOption) => {
    setSortBy(value);
  };

  const onViewGuests = (guestListId: string) => {
    router.push(`/${locale}/dashboard/guest-list/${guestListId}`);
  };

  return {
    searchQuery,
    onSearchChange,
    sortBy,
    onSortChange,
    onViewGuests,
    formatListDate,
    guestLists: filteredAndSortedLists,
    isLoading,
  };
}

export type UseGuestListReturn = ReturnType<typeof useGuestList>;
