import { create } from "zustand";

interface AppState {
  filters: {
    location: any;
  };
  setLocation(location: any): void;
}

const useAppStore = create<AppState>()((set) => ({
  filters: {
    location: null,
  },
  setLocation: (location) =>
    set((state) => ({ filters: { ...state.filters, location } })),
}));

export { useAppStore };
