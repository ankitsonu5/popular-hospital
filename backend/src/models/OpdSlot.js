import mongoose from 'mongoose';

const opdSlotSchema = new mongoose.Schema(
  {
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    slot_date: { type: String, required: true },
    slot_time: { type: String, required: true },
    is_available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// One doctor can have only one slot at a specific date+time+branch
opdSlotSchema.index({ branch: 1, doctor: 1, slot_date: 1, slot_time: 1 }, { unique: true });

const OpdSlot = mongoose.model('OpdSlot', opdSlotSchema);
export default OpdSlot;
