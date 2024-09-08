import { create } from 'zustand';

const useStore = create((set) => ({
  selectedPrescription: JSON.parse(localStorage.getItem('selectedPrescription')) || null,
  setSelectedPrescription: (prescription) => {
    set({ selectedPrescription: prescription });
    localStorage.setItem('selectedPrescription', JSON.stringify(prescription));
  },
}));

export default useStore;
