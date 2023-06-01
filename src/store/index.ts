import { create } from "zustand";

interface AppState {
  cachedData: any;
  filters: {
    location: any;
  };
  setLocation(location: any): void;
  setCache(cacheData: any): void;
}

const useAppStore = create<AppState>()((set) => ({
  cachedData: null,
  filters: {
    location: null,
  },
  setLocation: (location) =>
    set((state) => ({ filters: { ...state.filters, location } })),
  setCache: (cachedData) => set((state) => ({ cachedData })),
}));

export { useAppStore };
