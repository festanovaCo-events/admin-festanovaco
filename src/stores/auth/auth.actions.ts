import type { LoginResponseData, RegisterResponseData } from '@/interfaces';
import type { AuthStore, AuthActions } from '@/interfaces/stores';

type SetState<T> = {
  (partial: T | Partial<T> | ((state: T) => T | Partial<T>), replace?: false | undefined): void;
  (state: T | ((state: T) => T), replace: true): void;
};

export const createAuthActions = (
  set: SetState<AuthStore>,
  get: () => AuthStore
): AuthActions => ({
  setUser: (userData: LoginResponseData | RegisterResponseData) => {
    const { password, token, ...userWithoutSensitive } = userData;

    set({
      user: userWithoutSensitive,
      isAuthenticated: true,
    });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  getAccountId: () => {
    const state = get();
    if (!state.user) return null;
    
    if (state.user.accounts && Array.isArray(state.user.accounts) && state.user.accounts.length > 0) {
      return state.user.accounts[0].id;
    }
    
    return null;
  },
});
