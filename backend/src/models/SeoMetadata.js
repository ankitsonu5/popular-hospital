import mongoose from 'mongoose';

const seoMetadataSchema = new mongoose.Schema(
  {
    page_route: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    meta_title: {
      type: String,
      trim: true,
      default: '',
    },
    meta_description: {
      type: String,
      trim: true,
      default: '',
    },
    og_title: {
      type: String,
      trim: true,
      default: '',
    },
    og_description: {
      type: String,
      trim: true,
      default: '',
    },
    og_image: {
      type: String,
      trim: true,
      default: '',
    },
    canonical_url: {
      type: String,
      trim: true,
      default: '',
    },
    robots_meta: {
      type: String,
      trim: true,
      default: 'index, follow',
    },
  },
  {
    timestamps: true,
  }
);

const SeoMetadata = mongoose.model('SeoMetadata', seoMetadataSchema);

export default SeoMetadata;
