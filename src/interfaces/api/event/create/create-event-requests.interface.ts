import type { AssetKind, EventMode, EventType } from "../types.interface";

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

export interface UploadAssetRequest {
  file: File;
  kind: AssetKind;
  position: number;
}
