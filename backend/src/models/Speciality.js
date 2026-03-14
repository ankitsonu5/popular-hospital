import mongoose from 'mongoose';

const specialitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    department_display_name: { type: String, default: null },
  },
  { timestamps: true }
);

const Speciality = mongoose.model('Speciality', specialitySchema);
export default Speciality;
