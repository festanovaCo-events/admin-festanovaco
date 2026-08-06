import type { InvitationStatus } from "@/interfaces/api/common/global.interface";

export interface SubGuest {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  confirmed: boolean;
  status?: InvitationStatus;
  confirmedAt?: string;
  numberOfSeats: number;
  subGuests?: SubGuest[];
  invitationToken?: string;
  invitation_url?: string | null;
  availableSeats?: number;
}

export interface GuestList {
  id: string;
  name: string;
  eventType: string;
  owner: string;
  ownerEmail: string;
  createdAt: string;
  totalGuests: number;
  confirmedGuests: number;
  guests: Guest[];
}

export interface GuestListCardProps {
  guestList: GuestList;
  formatDate: (date: string) => string;
  getEventTypeLabel: (type: string) => string;
  onViewGuests: (guestListId: string) => void;
}

export interface GuestDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  guestList: GuestList | null;
  formatDate: (date: string) => string;
}

export interface GuestTableProps {
  guests: Guest[];
  expandedGuests: Set<string>;
  expandedGuestData: Record<string, InvitationDetailAugment>;
  loadingGuestIds: Set<string>;
  onToggleGuestExpansion: (guest: Guest) => void;
  onCopyInvitationUrl: (url: string | null | undefined) => void;
  searchQuery?: string;
}

export interface SubGuestsRowProps {
  subGuests: SubGuest[];
}

export interface SubGuestCardProps {
  subGuest: SubGuest;
}

export interface InvitationDetailAugment {
  confirmedAt?: string;
  numberOfSeats: number;
  availableSeats: number;
  subGuests: SubGuest[];
  totalSeats: number;
  usedSeats: number;
}

export interface GuestTableRowProps {
  guest: Guest;
  index: number;
  isExpanded: boolean;
  isLoading: boolean;
  data?: InvitationDetailAugment;
  onToggleExpand: () => void;
  onCopyInvitationUrl: (url: string | null | undefined) => void;
}

export interface GuestStatsCardsProps {
  totalGuests: number;
  confirmedCount: number;
  pendingCount: number;
}

export interface GuestSearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: "all" | "confirmed" | "pending" | "declined";
  onStatusFilterChange: (
    filter: "all" | "confirmed" | "pending" | "declined",
  ) => void;
  totalCount: number;
  confirmedCount: number;
  pendingCount: number;
  declinedCount?: number;
  guests: Guest[];
  listName?: string;
}

export interface GuestPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
}

export interface GuestListInfoProps {
  guestList: GuestList;
  getEventTypeLabel: (type: string) => string;
}
