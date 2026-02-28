import mongoose from 'mongoose';

const specialitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  },
  { timestamps: true }
);

const Speciality = mongoose.model('Speciality', specialitySchema);
export default Speciality;
