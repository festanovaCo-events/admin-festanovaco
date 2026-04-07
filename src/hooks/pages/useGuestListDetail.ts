import { useEffect, useState } from 'react';
import { useAsyncRequest, useGuestFilter, usePagination } from '@/hooks';
import { getEventById } from '@/services/event';
import { getInvitationsByEvent } from '@/services/invitation/get';
import type { Event } from '@/interfaces';
import type { Guest, GuestList } from '@/interfaces/components/app/dashboard/guest-list';

export interface UseGuestListDetailResult {
  isLoadingEvent: boolean;
  isLoadingGuests: boolean;
  isLoadingCombined: boolean;
  guestList: GuestList | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: 'all' | 'confirmed' | 'pending' | 'declined';
  setStatusFilter: (status: 'all' | 'confirmed' | 'pending' | 'declined') => void;
  expandedGuests: Set<string>;
  toggleGuestExpansion: (guestId: string) => void;
  filteredGuests: Guest[];
  paginatedGuests: Guest[];
  pagination: {
    currentPage: number;
    totalPages: number;
    startIndex: number;
    endIndex: number;
    handlePageChange: (page: number) => void;
  };
  counts: {
    confirmedCount: number;
    pendingCount: number;
    declinedCount: number;
  };
}

export function useGuestListDetail(eventId: string, itemsPerPage: number = 10): UseGuestListDetailResult {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'pending' | 'declined'>('all');
  const [expandedGuests, setExpandedGuests] = useState<Set<string>>(new Set());

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
    fetchEvent(async () => await getEventById(eventId));
    fetchGuests(async () => await getInvitationsByEvent(eventId));
  }, [fetchEvent, fetchGuests, eventId]);

  const safeGuests: Guest[] = guests ?? [];

  const guestList: GuestList | null = event
    ? {
        id: event.id,
        name: event.title,
        eventType: event.eventType,
        owner: event.createdBy || 'N/A',
        ownerEmail: 'N/A',
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

  const { currentPage, totalPages, startIndex, endIndex, handlePageChange } = usePagination({
    totalItems: filteredGuests.length,
    itemsPerPage,
    resetDependencies: [searchQuery, statusFilter],
  });

  const paginatedGuests = filteredGuests.slice(startIndex, endIndex);

  const confirmedCount = safeGuests.filter((g) => g.status === 'ACCEPTED' || g.confirmed).length;
  const pendingCount = safeGuests.filter((g) => (g.status ?? 'PENDING') === 'PENDING' && !g.confirmed).length;
  const declinedCount = safeGuests.filter((g) => g.status === 'DECLINED').length;

  const isBootstrapping = (typeof event === 'undefined' || typeof guests === 'undefined');
  const isLoadingCombined = isLoadingEvent || isLoadingGuests || isBootstrapping;

  const toggleGuestExpansion = (guestId: string) => {
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

  return {
    isLoadingEvent,
    isLoadingGuests,
    isLoadingCombined,
    guestList,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    expandedGuests,
    toggleGuestExpansion,
    filteredGuests,
    paginatedGuests,
    pagination: {
      currentPage,
      totalPages,
      startIndex,
      endIndex,
      handlePageChange,
    },
    counts: {
      confirmedCount,
      pendingCount,
      declinedCount,
    },
  };
}

