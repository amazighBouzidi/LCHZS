import { create } from 'zustand';

const useAnalyseStore = create((set) => ({
  analyses: [],
  addAnalyse: (newAnalyse) =>
    set((state) => ({
      analyses: [...state.analyses, newAnalyse],
    })),
}));

export default useAnalyseStore;
