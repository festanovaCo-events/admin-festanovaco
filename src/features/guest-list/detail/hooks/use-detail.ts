"use client";

import { useParams } from "next/navigation";
import { useDetailEffect } from "./effect/use-detail-effect";
import { useDetailHandler } from "./handler/use-detail-handler";
import { useDetailState } from "./state/use-detail-state";

const ITEMS_PER_PAGE = 10;

export function useGuestListDetail() {
  const params = useParams();
  const eventId = params.id as string;

  const state = useDetailState({ itemsPerPage: ITEMS_PER_PAGE });

  const handler = useDetailHandler({
    expandedGuests: state.expandedGuests,
    setExpandedGuests: state.setExpandedGuests,
    expandedGuestData: state.expandedGuestData,
    setExpandedGuestData: state.setExpandedGuestData,
    setLoadingGuestIds: state.setLoadingGuestIds,
  });

  useDetailEffect({
    eventId,
    fetchEvent: state.fetchEvent,
    fetchGuests: state.fetchGuests,
  });

  return {
    isLoadingCombined: state.isLoadingCombined,
    guestList: state.guestList,
    searchQuery: state.searchQuery,
    setSearchQuery: state.setSearchQuery,
    statusFilter: state.statusFilter,
    setStatusFilter: state.setStatusFilter,
    expandedGuests: state.expandedGuests,
    expandedGuestData: state.expandedGuestData,
    loadingGuestIds: state.loadingGuestIds,
    onToggleGuestExpansion: handler.onToggleGuestExpansion,
    onCopyInvitationUrl: handler.onCopyInvitationUrl,
    onBack: handler.onBack,
    filteredGuests: state.filteredGuests,
    paginatedGuests: state.paginatedGuests,
    pagination: state.pagination,
    itemsPerPage: ITEMS_PER_PAGE,
    counts: {
      confirmedCount: state.confirmedCount,
      pendingCount: state.pendingCount,
      declinedCount: state.declinedCount,
    },
  };
}

export type UseGuestListDetailReturn = ReturnType<typeof useGuestListDetail>;
