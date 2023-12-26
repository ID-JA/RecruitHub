import { create } from 'zustand';

export type User = {
  name: string;
  emailConfirmed: boolean;
  email: string;
  imageUrl: string;
  id: string;
};

export type Store = {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  logout: () => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const useAuthStore = create<Store>((set) => ({
  user: null,
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  setUser: (user) => set({ user, isLoggedIn: true }),
  logout: () => {
    set({ user: null, isLoggedIn: false });
    window.localStorage.removeItem('token');
  }
}));
