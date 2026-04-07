import type { ApiResponse } from '../common/global.interface';
import type { InvitationInfoData, InvitationItemData, UploadInvitationResponseData } from './data.interface';

export type ListInvitationsResponse = ApiResponse<InvitationItemData[]>;
export type GetInvitationInfoResponse = ApiResponse<InvitationInfoData>;
export type UploadInvitationResponse = ApiResponse<UploadInvitationResponseData>;

