import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
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
  officeAddress: {
    type: String,
    required: true,
    default: ""
  },
  speciality: {
    type: String,
    required: true,
    default: ""
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model('Doctor', doctorSchema);