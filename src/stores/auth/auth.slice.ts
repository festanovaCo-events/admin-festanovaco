import type { AuthState } from '@/interfaces/stores';

export const createAuthSlice = (): AuthState => ({
  user: null,
  isAuthenticated: false,
});
