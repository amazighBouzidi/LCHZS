import mongoose, { Schema } from 'mongoose';

const  appointmentsSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
});

export default mongoose.model('Appointment', appointmentsSchema);