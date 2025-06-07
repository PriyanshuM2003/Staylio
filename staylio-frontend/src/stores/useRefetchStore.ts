import { create } from "zustand";

type AuthState = {
  refetchKey: number;
  bumpRefetchKey: () => void;
};

export const useRefetchStore = create<AuthState>((set) => ({
  refetchKey: 0,
  bumpRefetchKey: () =>
    set((state) => ({ refetchKey: state.refetchKey + 1 })),
}));
