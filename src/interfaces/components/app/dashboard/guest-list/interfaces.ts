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
  confirmedAt?: string;
  numberOfSeats: number;
  subGuests?: SubGuest[];
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
}

export interface GuestDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  guestList: GuestList | null;
  formatDate: (date: string) => string;
}

