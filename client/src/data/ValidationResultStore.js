import { create } from 'zustand';

const useStore = create((set) => ({
  selectedResultsValidate: JSON.parse(localStorage.getItem('selectedResultsValidate')) || null,
  setSelectedResultsValidate: (prescription) => {
    set({ selectedResultsValidate: prescription });
    localStorage.setItem('selectedResultsValidate', JSON.stringify(prescription));
  },
}));

export default useStore;