import type { ApiResponse } from '../common/global.interface';
import type { LoginResponseData, RegisterResponseData } from './data.interface';

export type RegisterResponse = ApiResponse<RegisterResponseData>;
export type LoginResponse = ApiResponse<LoginResponseData>;

