export type EventType = 'wedding' | 'birthday' | 'anniversary' | 'graduation' | 'corporate';
export type EventMode = 'on_site' | 'online' | 'hybrid';
export type AssetKind = 'banner' | 'carousel_image' | 'video' | 'doc' | 'audio';

export type EventTypeApi = Uppercase<EventType>;
export type EventModeApi = Uppercase<EventMode>;
export type AssetKindApi = Uppercase<AssetKind>;

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
  assets: EventAssetData[] | null;
  address: string;
  capacity: number;
  config: EventConfigData | null;
  created_at: string;
  created_by: string;
  deleted_at: string | null;
  ends_at: string;
  is_public: boolean;
  mode: EventModeApi | string;
  starts_at: string;
  status: string;
  template_id: string | null;
  title: string;
  type: EventTypeApi | string;
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
  asset: EventAssetData;
}

export interface UploadAssetResponseData {
  asset: EventAssetData;
}

export interface EventAssetData {
  id: string;
  event_id: string;
  kind: AssetKindApi | string;
  url: string;
  position: number;
  provider: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface EventConfigData {
  id: string;
  eventId: string;
  metadata: EventMetadataData;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EventMetadataData {
  quote?: string;
  wifeName?: string;
  husbandName?: string;
  addressParty?: string;
}

import type { ApiResponse } from './auth.interface';

export interface EventConfigRequest {
  HusbandName: string;
  WifeName: string;
  PartyDate: string;
  WeddingDate: string;
  AddressParty: string;
  Quote: string;
}

export type EventConfigResponseData = string;

export type CreateEventResponse = ApiResponse<CreateEventResponseData>;
export type ListEventsResponse = ApiResponse<ListEventsResponseData>;
export type GetEventResponse = ApiResponse<GetEventResponseData>;
export type UploadAssetResponse = ApiResponse<UploadAssetResponseData>;
export type EventConfigResponse = ApiResponse<EventConfigResponseData>;