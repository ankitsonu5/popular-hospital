import mongoose from "mongoose";

const branchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    city: { type: String, required: true },
    heading: { type: String, default: null },
    title: { type: String, default: null },
    description: { type: String, default: null },
    address: { type: String, required: true },
    phone: { type: String, default: null },
    email: { type: String, default: null },
    state: { type: String, default: null },
    pincode: { type: String, default: null },
    timings: { type: String, default: null },
    // Gallery images — named for easy admin understanding
    image_one: { type: String, default: null },
    image_two: { type: String, default: null },
    image_three: { type: String, default: null },
    image_four: { type: String, default: null },
    // Map integration
    mapEmbedUrl: { type: String, default: null },
    mapDirectionsUrl: { type: String, default: null },
    facilities: { type: String, default: null },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Branch = mongoose.model("Branch", branchSchema);
export default Branch;
