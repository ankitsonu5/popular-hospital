import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    speciality: { type: mongoose.Schema.Types.ObjectId, ref: 'Speciality', required: true },
    qualification: { type: String, default: null },
    experience_years: { type: Number, default: null },
    bio: { type: String, default: null },
    image_url: { type: String, default: null },
    consultation_fee: { type: Number, default: null },
    available_days: { type: String, default: null },
    branches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }],
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
