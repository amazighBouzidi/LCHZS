// store.js
import create from 'zustand';

const useStore = create((set) => ({
  selectedPatient: null,
  selectedDoctor: null,
  setSelectedPatient: (patient) => set({ selectedPatient: patient }),
  setSelectedDoctor: (doctor) => set({ selectedDoctor: doctor }),
}));

export default useStore;
