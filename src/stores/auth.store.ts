import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  user: User | null;
  isLoggedOut: boolean;

  clearLogoutFlag: () => void;

  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  loading: false,
  error: null,
  user: null,
  isLoggedOut: false, // thêm flag

  clearLogoutFlag: () => set({ isLoggedOut: false }),

  setAccessToken: (token) => {
    if (typeof window !== "undefined") {
      if (token) localStorage.setItem("accessToken", token);
      else localStorage.removeItem("accessToken");
    }
    set({ accessToken: token });
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setUser: (user) => {
    if (typeof window !== "undefined") {
      if (user) localStorage.setItem("user", JSON.stringify(user));
      else localStorage.removeItem("user");
    }
    set({ user });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
    set({
      accessToken: null,
      user: null,
      loading: false,
      error: null,
      isLoggedOut: true, // đánh dấu đây là logout thủ công
    });
  },

  initAuth: () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      const userData = localStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;
      set({ accessToken: token, user });
    }
  },
}));
