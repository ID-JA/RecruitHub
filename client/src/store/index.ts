import { create } from 'zustand';

export type User = {
  name: string;
  emailConfirmed: boolean;
  email: string;
  imageUrl: string;
  id: string;
};

export interface ICompanyData {
  id: number;
  title: string;
  location: string;
  description: string;
  founded_at: number;
  type: string;
  website: string;
  status: string;
  contact_email: string;
  contact_phone: string;
  logo: string;
  revenue: number;
  facebook: string;
  instagram: string;
  linkedin: string;
  created_at: string;
  updated_at: string;
}

type TCompany = { value: string; label: string };
export type Store = {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  companies: TCompany[];
  selectedCompany: { value: string; label: string } | null;
  setSelectedCompany: (company: TCompany) => void;
  setCompanies: (companies: TCompany[]) => void;
  logout: () => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const useAuthStore = create<Store>((set) => ({
  user: null,
  isLoggedIn: false,
  selectedCompany: null,
  companies: [],
  setSelectedCompany: (company) => set({ selectedCompany: company }),
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  setUser: (user) => set({ user, isLoggedIn: true }),
  setCompanies: (companies) => set({ companies }),
  logout: () => {
    set({ user: null, isLoggedIn: false });
    window.localStorage.removeItem('token');
  }
}));
