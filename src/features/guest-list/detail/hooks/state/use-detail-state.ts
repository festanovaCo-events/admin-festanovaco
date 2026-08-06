"use client";

import { useState } from "react";
import type { Event } from "@/interfaces/components/app/dashboard/event/list/event.interface";
import type { Guest, GuestList } from "@/interfaces/components/app/dashboard/guest-list/interfaces";
import { useAsyncRequest } from "@/shared/hooks/use-async-request";
import { useGuestFilter } from "@/shared/hooks/use-guest-filter";
import { usePagination } from "@/shared/hooks/use-pagination";
import type { InvitationDetailAugment } from "../data/detail";

export type StatusFilter = "all" | "confirmed" | "pending" | "declined";

type UseDetailStateParams = {
  itemsPerPage: number;
};

export function useDetailState({ itemsPerPage }: UseDetailStateParams) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [expandedGuests, setExpandedGuests] = useState<Set<string>>(new Set());
  const [expandedGuestData, setExpandedGuestData] = useState<
    Record<string, InvitationDetailAugment>
  >({});
  const [loadingGuestIds, setLoadingGuestIds] = useState<Set<string>>(
    new Set(),
  );

  const {
    isLoading: isLoadingEvent,
    data: event,
    execute: fetchEvent,
  } = useAsyncRequest<Event | null>({ showToast: false });

  const {
    isLoading: isLoadingGuests,
    data: guests,
    execute: fetchGuests,
  } = useAsyncRequest<Guest[]>({ showToast: false });

  const safeGuests: Guest[] = guests ?? [];

  const guestList: GuestList | null = event
    ? {
        id: event.id,
        name: event.title,
        eventType: event.eventType,
        owner: event.createdBy || "N/A",
        ownerEmail: "N/A",
        createdAt: event.createdAt,
        totalGuests: event.capacity ?? safeGuests.length,
        confirmedGuests: safeGuests.filter((g) => g.confirmed).length,
        guests: safeGuests,
      }
    : null;

  const { filteredGuests } = useGuestFilter({
    guests: guestList?.guests ?? [],
    searchQuery,
    statusFilter,
  });

  const pagination = usePagination({
    totalItems: filteredGuests.length,
    itemsPerPage,
    resetDependencies: [searchQuery, statusFilter],
  });

  const paginatedGuests = filteredGuests.slice(
    pagination.startIndex,
    pagination.endIndex,
  );

  const confirmedCount = safeGuests.filter(
    (g) => g.status === "ACCEPTED" || g.confirmed,
  ).length;
  const pendingCount = safeGuests.filter(
    (g) => (g.status ?? "PENDING") === "PENDING" && !g.confirmed,
  ).length;
  const declinedCount = safeGuests.filter(
    (g) => g.status === "DECLINED",
  ).length;

  const isBootstrapping =
    typeof event === "undefined" || typeof guests === "undefined";
  const isLoadingCombined =
    isLoadingEvent || isLoadingGuests || isBootstrapping;

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    expandedGuests,
    setExpandedGuests,
    expandedGuestData,
    setExpandedGuestData,
    loadingGuestIds,
    setLoadingGuestIds,
    fetchEvent,
    fetchGuests,
    guestList,
    filteredGuests,
    paginatedGuests,
    pagination,
    confirmedCount,
    pendingCount,
    declinedCount,
    isLoadingCombined,
  };
}

export type DetailState = ReturnType<typeof useDetailState>;
