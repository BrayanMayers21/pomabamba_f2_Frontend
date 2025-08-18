import { create } from "zustand";
import { login as apiLogin } from "../api/auth"; // tu función que hace la request

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: any | null;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refresh_token"),
  user: null,
  error: null,

  login: async (email: string, password: string) => {
    try {
      const { access, refresh, user } = await apiLogin(email, password);

      localStorage.setItem("token", access);
      localStorage.setItem("refresh_token", refresh);

      set({
        token: access,
        refreshToken: refresh,
        user,
        error: null,
      });
    } catch (err) {
      set({
        error: "Credenciales inválidas",
        token: null,
        refreshToken: null,
        user: null,
      });
      throw err; // para que LoginPage pueda mostrar el error si quiere
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");

    set({
      token: null,
      refreshToken: null,
      user: null,
      error: null,
    });
  },
}));
