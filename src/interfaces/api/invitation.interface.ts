import type { ApiResponse } from './auth.interface';

export interface UploadInvitationRequest {
  file: File;
}

export interface UploadInvitationResponseData {
  id: string;
  event_id: string;
  file_name: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export type UploadInvitationResponse = ApiResponse<UploadInvitationResponseData>;
