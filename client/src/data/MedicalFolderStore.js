import { create } from 'zustand';

const useStore = create((set) => ({
  selectedMedicalFolder: JSON.parse(localStorage.getItem('selectedMedicalFolder')) || null,
  setSelectedMedicalFolder: (medicalFolder) => {
    set({ selectedMedicalFolder: medicalFolder });
    localStorage.setItem('selectedMedicalFolder', JSON.stringify(medicalFolder));
  },
}));

export default useStore;
