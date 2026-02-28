import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, default: '' },
    content: [{ type: String }], // Array of paragraphs for the detail page
    image: { type: String, required: true }, // Main thumbnail image
    author: { type: String, default: null }, // Using 'author' field to store News Source
    date: { type: String, required: true }, // Display date (e.g., "February 10, 2026")
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const News = mongoose.model('News', newsSchema);
export default News;
