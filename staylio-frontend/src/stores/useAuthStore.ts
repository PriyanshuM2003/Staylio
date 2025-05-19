import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getUserId, resetAuthCookies } from "@/services/actions";

type AuthState = {
  userId: string | null;
  setUserId: (id: string | null) => void;
  refreshUserId: () => Promise<void>;
  logout: () => Promise<void>;
  refetchKey: number;
  bumpRefetchKey: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      refetchKey: 0,
      setUserId: (id) => set({ userId: id }),
      bumpRefetchKey: () =>
        set((state) => ({ refetchKey: state.refetchKey + 1 })),
      refreshUserId: async () => {
        const id = await getUserId();
        set({ userId: id });
        set((state) => ({ refetchKey: state.refetchKey + 1 }));
      },
      logout: async () => {
        await resetAuthCookies();
        set({ userId: null });
        set((state) => ({ refetchKey: state.refetchKey + 1 }));
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
