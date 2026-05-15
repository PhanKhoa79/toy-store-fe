import { create } from 'zustand';
import type { CurrentUser } from '@/types/contracts';

type AuthState = {
  user: CurrentUser | null;
  isAuthenticated: boolean;
  setUser: (user: CurrentUser | null) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: Boolean(user) }),
  clearUser: () => set({ user: null, isAuthenticated: false })
}));
