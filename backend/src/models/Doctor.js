import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    speciality: { type: mongoose.Schema.Types.ObjectId, ref: 'Speciality', required: true },
    qualification: { type: String, default: null },
    experience_years: { type: Number, default: null },
    experience_location: { type: String, default: null },
    bio: { type: String, default: null },
    image_url: { type: String, default: null },
    consultation_fee: { type: Number, default: null },
    available_days: { type: String, default: null },
    opd_timings: {
      monday: { type: String, default: '9am-12pm & 4pm-8pm' },
      tuesday: { type: String, default: '9am-12pm & 4pm-8pm' },
      wednesday: { type: String, default: '9am-12pm & 4pm-8pm' },
      thursday: { type: String, default: '9am-12pm & 4pm-8pm' },
      friday: { type: String, default: '9am-12pm & 4pm-8pm' },
      saturday: { type: String, default: '9am-12pm & 4pm-8pm' },
      sunday: { type: String, default: '-' },
    },
    branches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }],
    designation: { type: mongoose.Schema.Types.ObjectId, ref: 'Designation', default: null },
    is_active: { type: Boolean, default: true },
    sortIndex: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
