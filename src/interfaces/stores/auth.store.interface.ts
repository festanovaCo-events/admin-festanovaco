import type { LoginResponseData, RegisterResponseData } from '@/interfaces/api/auth.interface';

export type StoredUser = Omit<LoginResponseData, 'password' | 'token'> | Omit<RegisterResponseData, 'password' | 'token'>;

export interface AuthState {
  user: StoredUser | null;
  isAuthenticated: boolean;
}

export interface AuthActions {
  setUser: (userData: LoginResponseData | RegisterResponseData) => void;
  logout: () => void;
  getAccountId: () => string | null;
}

export type AuthStore = AuthState & AuthActions;
