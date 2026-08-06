import type { AuthState } from "@/interfaces/stores/auth.store.interface";

export const createAuthSlice = (): AuthState => ({
  user: null,
  isAuthenticated: false,
});
