import mongoose from 'mongoose';

const analyseSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  prix: {
    type: Number,
    required: true
  },
});

export default mongoose.model('Analyse', analyseSchema);