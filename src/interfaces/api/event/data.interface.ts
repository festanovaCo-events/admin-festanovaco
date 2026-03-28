import type { AssetKindApi, EventModeApi } from './types.interface';

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
  type: string;
  updated_at: string;
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

export type CreateEventResponseData = EventData;
export type ListEventsResponseData = EventData[];
export type GetEventResponseData = EventData;
export interface UploadAssetResponseData { asset: EventAssetData }
export type EventConfigResponseData = string;

