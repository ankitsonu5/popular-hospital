import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    date: { type: String, required: true },
    thumbnail: { type: String, required: true }, // Main list image
    gallery: [{ type: String }], // Multiple images for the detail page
    description: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

eventSchema.index({ title: 'text' });

const Event = mongoose.model('Event', eventSchema);
export default Event;
