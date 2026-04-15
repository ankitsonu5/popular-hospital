import mongoose from "mongoose";

const heroBannerSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["image", "video"], default: "image" },
    desktopMediaUrl: { type: String, required: true },
    mobileMediaUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("HeroBanner", heroBannerSchema);
