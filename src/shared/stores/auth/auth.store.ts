import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthStore } from "@/interfaces/stores/auth.store.interface";
import { createAuthActions } from "./auth.actions";
import { createAuthSlice } from "./auth.slice";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...createAuthSlice(),
      ...createAuthActions(set, get),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    },
  ),
);
