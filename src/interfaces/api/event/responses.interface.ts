import type { ApiResponse } from '../common/global.interface';
import type {
  CreateEventResponseData,
  ListEventsResponseData,
  GetEventResponseData,
  UploadAssetResponseData,
  EventConfigResponseData,
} from './data.interface';

export type CreateEventResponse = ApiResponse<CreateEventResponseData>;
export type ListEventsResponse = ApiResponse<ListEventsResponseData>;
export type GetEventResponse = ApiResponse<GetEventResponseData>;
export type UploadAssetResponse = ApiResponse<UploadAssetResponseData>;
export type EventConfigResponse = ApiResponse<EventConfigResponseData>;

