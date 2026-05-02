import { create } from 'zustand';

type User = { name: string; email: string };

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  signIn: async (email) => {
    // Mock auth: any email/password works
    const name = email.split('@')[0] || 'Aquarist';
    set({ user: { name, email }, isAuthenticated: true });
  },
  signUp: async (name, email) => {
    set({ user: { name, email }, isAuthenticated: true });
  },
  signOut: () => set({ user: null, isAuthenticated: false }),
}));
