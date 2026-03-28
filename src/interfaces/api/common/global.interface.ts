export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export type InvitationStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED';

