import { create } from 'zustand';

// Define your Zustand store
const useStore = create((set) => ({
  user: [],
  setUser: (value) => set({ user: value }),
}));

export default useStore;