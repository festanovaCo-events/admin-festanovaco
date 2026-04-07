import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createAuthSlice } from './auth.slice';
import { createAuthActions } from './auth.actions';
import type { AuthStore } from '@/interfaces/stores';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...createAuthSlice(),
      ...createAuthActions(set, get),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
