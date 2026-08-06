"use client";

import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Event } from "@/interfaces/components/app/dashboard/event/list/event.interface";
import type {
  Guest,
  GuestList,
  InvitationDetailAugment,
} from "@/interfaces/components/app/dashboard/guest-list/interfaces";
import { getEventById } from "@/shared/data/event/get";
import {
  getInvitationInfoByToken,
  getInvitationsByEvent,
} from "@/shared/data/invitation/get";
import { mapInvitationInfoToAugment } from "@/shared/data/invitation/invitation-info.adapter";
import { useAsyncRequest } from "@/shared/hooks/use-async-request";
import { useGuestFilter } from "@/shared/hooks/use-guest-filter";
import { usePagination } from "@/shared/hooks/use-pagination";

const ITEMS_PER_PAGE = 10;

type StatusFilter = "all" | "confirmed" | "pending" | "declined";

export function useGuestListDetail() {
  const params = useParams();
  const eventId = params.id as string;
  const router = useRouter();
  const tTable = useTranslations("guestList.details.table");

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

  useEffect(() => {
    if (!eventId) return;
    void fetchEvent(async () => await getEventById(eventId));
    void fetchGuests(async () => await getInvitationsByEvent(eventId));
  }, [fetchEvent, fetchGuests, eventId]);

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
    itemsPerPage: ITEMS_PER_PAGE,
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

  const isLoadingCombined = isLoadingEvent || isLoadingGuests;

  const onBack = () => {
    router.back();
  };

  const onToggleGuestExpansion = async (guest: Guest) => {
    const guestId = guest.id;
    const isExpanded = expandedGuests.has(guestId);

    if (!isExpanded && guest.invitationToken && !expandedGuestData[guestId]) {
      setLoadingGuestIds((prev) => new Set(prev).add(guestId));

      try {
        const info = await getInvitationInfoByToken(guest.invitationToken);
        const augmented = mapInvitationInfoToAugment(info);
        setExpandedGuestData((prev) => ({ ...prev, [guestId]: augmented }));
      } finally {
        setLoadingGuestIds((prev) => {
          const next = new Set(prev);
          next.delete(guestId);
          return next;
        });
      }
    }

    setExpandedGuests((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(guestId)) {
        newSet.delete(guestId);
      } else {
        newSet.add(guestId);
      }
      return newSet;
    });
  };

  const onCopyInvitationUrl = async (url: string | null | undefined) => {
    if (!url) return;

    try {
      await navigator.clipboard.writeText(url);
      toast.success(tTable("invitationUrlCopied"));
    } catch {
      toast.error(tTable("invitationUrlCopyError"));
    }
  };

  return {
    isLoadingCombined,
    guestList,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    expandedGuests,
    expandedGuestData,
    loadingGuestIds,
    onToggleGuestExpansion,
    onCopyInvitationUrl,
    onBack,
    filteredGuests,
    paginatedGuests,
    pagination,
    itemsPerPage: ITEMS_PER_PAGE,
    counts: {
      confirmedCount,
      pendingCount,
      declinedCount,
    },
  };
}

export type UseGuestListDetailReturn = ReturnType<typeof useGuestListDetail>;
