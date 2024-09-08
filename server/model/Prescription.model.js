import mongoose from 'mongoose';

// Define the schema for the Prescription collection
const prescriptionSchema = new mongoose.Schema({
  selectedPatient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the Patient model
    required: true
  },
  selectedDoctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', // Reference to the Doctor model
    required: true
  },
  analysis: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Analyse', // Reference to the Analyse model
    required: true
  }],
  dateCreation: {
    type: Date,
    default: Date.now, // Automatically set the creation date to the current date and time
    required: true
  }
});

// Export the Prescription model based on the prescriptionSchema
export default mongoose.model('Prescription', prescriptionSchema);
