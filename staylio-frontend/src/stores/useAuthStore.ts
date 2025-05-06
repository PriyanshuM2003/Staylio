import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getUserId, resetAuthCookies } from "@/services/actions";

type AuthState = {
  userId: string | null;
  setUserId: (id: string | null) => void;
  refreshUserId: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      setUserId: (id) => set({ userId: id }),
      refreshUserId: async () => {
        const id = await getUserId();
        set({ userId: id });
      },
      logout: async () => {
        await resetAuthCookies();
        set({ userId: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
