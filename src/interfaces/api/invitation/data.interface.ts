import type { InvitationStatus } from '../common/global.interface';

export interface UploadInvitationResponseData {
  id: string;
  event_id: string;
  file_name: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface InvitationItemData {
  id: string;
  name: string;
  email: string | null;
  invitation_url?: string | null;
  accept_url?: string | null;
  status: InvitationStatus;
  total_seats?: number;
  seats?: number;
}

export interface InvitationGuestItemData {
  id: string;
  invitation_id: string;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface InvitationInfoItemData {
  id: string;
  event_id: string;
  email: string;
  name: string;
  seats_reserved: number;
  status: InvitationStatus;
  token: string;
  responded_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  guests: InvitationGuestItemData[];
}

export interface InvitationInfoData {
  available_seats: number;
  invitation: InvitationInfoItemData;
  total_seats: number;
  used_seats: number;
}

