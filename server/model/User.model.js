import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    default: ''
  },
  address: {
    type: String,
    required: true,
    default: ""
  },
  dateBirth: {
    type: Date,
    default: null,
  },
  profile: { 
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: { 
    type: String, 
    enum: ['patient', 'biologisteClinique', 'technicienLaboratoire', 'agentAccueil', 'administrateur'] 
  },
  accountCreationDate: { 
    type: Date, 
    default: Date.now 
  },
  
});

export default mongoose.model('User', userSchema);