export type EventType = 'wedding' | 'birthday' | 'anniversary' | 'graduation' | 'corporate';
export type EventMode = 'on_site' | 'online' | 'hybrid';
export type AssetKind = 'banner' | 'carousel_image' | 'video' | 'doc' | 'audio';

export interface CreateEventRequest {
  accountId: string;
  title: string;
  type: EventType;
  mode: EventMode;
  address: string;
  isPublic: boolean;
  capacity: number;
  startsAt: string;
  endsAt: string;
}

export interface EventData {
  id: string;
  account_id: string;
  account: unknown | null;
  assets: unknown | null;
  capacity: number;
  config: unknown | null;
  created_at: string;
  created_by: string;
  deleted_at: string;
  ends_at: string;
  is_public: boolean;
  mode: string;
  starts_at: string;
  status: string;
  template_id: string | null;
  title: string;
  type: string;
  updated_at: string;
}

export type CreateEventResponseData = EventData;

export type ListEventsResponseData = EventData[];

export type GetEventResponseData = EventData;

export interface UploadAssetRequest {
  file: File;
  kind: AssetKind;
  position: number;
}

export interface AssetData {
  id: string;
  eventId: string;
  kind: AssetKind;
  position: number;
  url: string;
  createdAt: string;
}

export interface UploadAssetResponseData {
  asset: AssetData;
}

import type { ApiResponse } from './auth.interface';

export interface EventConfigRequest {
  HusbandName: string;
  WifeName: string;
  PartyDate: string;
  WeddingDate: string;
  Address: string;
  Quote: string;
}

export type EventConfigResponseData = string;

export type CreateEventResponse = ApiResponse<CreateEventResponseData>;
export type ListEventsResponse = ApiResponse<ListEventsResponseData>;
export type GetEventResponse = ApiResponse<GetEventResponseData>;
export type UploadAssetResponse = ApiResponse<UploadAssetResponseData>;
export type EventConfigResponse = ApiResponse<EventConfigResponseData>;