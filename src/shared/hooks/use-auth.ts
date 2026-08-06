import { useAuthStore } from "@/shared/stores/auth/auth.store";

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const getAccountId = useAuthStore((state) => state.getAccountId);

  const accounts = user?.accounts || [];

  const accountId = getAccountId();

  return {
    user,
    accounts,
    accountId,
    isAuthenticated,
    logout,
  };
}
