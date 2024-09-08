import mongoose from 'mongoose';

// Define the schema for the dataAnalysis collection
const dataAnalysisSchema = new mongoose.Schema({
  prescriptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription', // Reference to the Prescription model
    required: true
  },
  listAnalysis: [{
    analysis: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Analyse', // Reference to the Analyse model
      required: true
    },
    result: {
      type: String,
      default: ''
    },
    validateAnalysis: {
      type: Boolean,
      default: false
    }
  }],
  validatePrescription: {
    type: String
  },
  dateCreation: {
    type: Date,
    default: Date.now,
    required: true
  }
});

// Export the dataAnalysis model based on the dataAnalysisSchema
export default mongoose.model('Result', dataAnalysisSchema);
