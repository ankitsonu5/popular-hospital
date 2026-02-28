import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    patient_name: { type: String, required: true, trim: true },
    patient_phone: { type: String, required: true },
    patient_email: { type: String, default: '' },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    slot_date: { type: String, required: true },
    slot_time: { type: String, required: true },
    status: { type: String, enum: ['confirmed', 'cancelled', 'completed'], default: 'confirmed' },
    notes: { type: String, default: null },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
